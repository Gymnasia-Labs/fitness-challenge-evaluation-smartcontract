// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./Evaluation.sol";
// import "./LockFactory.sol";
import "./Challenger.sol";
import "./StringUtils.sol";
import "./Ownable.sol";
import "./GymToken.sol";

contract ChallengeManager is Ownable {
    using StringUtils for string;

    uint256 counter = 0;
    Challenger challenger;
    GymToken gymToken;
    uint256 public gymnasiaFee = 10; //percentage so always divide by 100 before

    struct Challenge {
        uint256 id; //todo remove if not needed in frontend
        address creator;
        uint256 start;
        uint256 end;
        uint256 currentParticipantsCount;
        uint256 maxParticipantsCount;
        uint256 fee;
        uint256 price;
        address first;
        bool redeemed;
        string tokenURI;
    }

    struct Rules {
        uint32[] types;
        uint32[] conditions;
    }

    struct LeaderboardEntry {
        address challenger;
        uint32[] data; //todo change data to array if multiple challenges in one needed
        uint32[] time;
    }

    mapping(uint256 => LeaderboardEntry[]) public leaderboards;
    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => Rules) internal rules;
    mapping(uint256 => Evaluation) public evaluations;

    mapping(uint256 => mapping(address => bool)) public challengeKeys;

    event ChallengeCreated(Challenge challenge);
    event LeaderboardEntryAdded(LeaderboardEntry leaderboardEntry);

    modifier onlyChallenger() {
        require(
            msg.sender == challenger.getAddress(),
            "ChallengeManager: caller is not challenger"
        );
        _;
    }

    function setChallenger(address adr) public onlyOwnerOrFirst {
        challenger = Challenger(adr);
    }

    function setGymToken(address adr) public onlyOwnerOrFirstToken {
        gymToken = GymToken(adr);
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function setRedeemed(uint256 challengeId) public onlyChallenger {
        challenges[challengeId].redeemed = true;
    }

    function setGymnasiaFee(uint256 percentage) external onlyOwner {
        require(
            percentage >= 0 && percentage <= 100,
            "ChallengeManager: argument out of range -> not between 0 and 100"
        );
        gymnasiaFee = percentage;
    }

    function getFee(uint256 challengeId) public view returns (uint256) {
        return challenges[challengeId].fee;
    }

    function createChallengeInt(
        uint32[] calldata types,
        uint32[] calldata conditions,
        uint256 start,
        uint256 end,
        uint256 maxParticipantsCount,
        uint256 fee,
        address evaluationAdr
    ) internal returns (Challenge memory) {
        //todo keys could be bought before start time through unlock contract

        require(start > block.timestamp, "ChallangeManager: start in the past"); //start
        require(end > start, "ChallengeManager: end time before start time");
        require(
            types.length == conditions.length,
            "ChallengeManager: the condition count and challenge types count needs to be the same"
        );
        require(
            conditions.length > 0,
            "ChallengeManager: conditions are not allowed to be empty"
        );

        rules[counter] = Rules(types, conditions);

        challenges[counter].id = counter;
        challenges[counter].creator = msg.sender;
        challenges[counter].start = start;
        challenges[counter].end = end;
        challenges[counter].maxParticipantsCount = maxParticipantsCount;
        challenges[counter].fee = fee;
        evaluations[counter] = Evaluation(evaluationAdr);

        evaluations[counter].setRules(counter, conditions);

        emit ChallengeCreated(challenges[counter]);

        return challenges[counter++];
    }

    function createChallenge(
        uint32[] calldata types,
        uint32[] calldata conditions,
        uint256 start,
        uint256 end,
        uint256 maxParticipantsCount,
        uint256 fee,
        address evaluationAdr
    ) external returns (Challenge memory) {
        return
            createChallengeInt(
                types,
                conditions,
                start,
                end,
                maxParticipantsCount,
                fee,
                evaluationAdr
            );
    }

    function createChallengeWithNFT(
        uint32[] calldata types,
        uint32[] calldata conditions,
        uint256 start,
        uint256 end,
        uint256 maxParticipantsCount,
        uint256 fee,
        address evaluationAdr,
        string memory tokenURI
    ) external returns (Challenge memory) {
        createChallengeInt(
            types,
            conditions,
            start,
            end,
            maxParticipantsCount,
            fee,
            evaluationAdr
        );
        challenges[counter - 1].tokenURI = tokenURI;
        return challenges[counter - 1];
    }

    function addLeaderboardEntry(
        uint256 challengeId,
        address sender,
        uint32[] memory data,
        uint32[] memory time,
        bool withUnlock
    ) public payable onlyChallenger {
        require(
            evaluations[challengeId].checkRules(challengeId, data),
            "ChallengeManager: data does not match ruleset"
        );
        if (withUnlock) {
            require(
                msg.value >= getKeyPrice(challengeId),
                "ChallengeManager: entered Challengefee too low"
            );
            challenges[challengeId].price += getKeyPrice(challengeId);
            challenges[challengeId].currentParticipantsCount++;
            challengeKeys[challengeId][sender] = true;
        }

        leaderboards[challengeId].push(LeaderboardEntry(sender, data, time));

        challenges[challengeId].first = evaluations[challengeId].evaluate(
            leaderboards[challengeId]
        );

        emit LeaderboardEntryAdded(
            leaderboards[challengeId][leaderboards[challengeId].length - 1]
        );
    }

    function getKeyPrice(uint256 id) public view returns (uint256) {
        uint256 fee = getFee(id);
        fee = fee - (fee / 100) * gymnasiaFee;
        return fee;
    }

    function hasUnlockedChallenge(uint256 id, address adr)
        public
        view
        returns (bool)
    {
        return challengeKeys[id][adr];
    }

    function withdraw(uint256 id, address winner) public onlyChallenger {
        require(
            challenges[id].redeemed == false,
            "Challengemanager: Challenge already redeemed"
        );
        bool sent = payable(winner).send(challenges[id].price);
        require(sent, "Challengemanager: Failed to send ether");
        if (bytes(challenges[id].tokenURI).length > 0) {
            gymToken.mint(winner, challenges[id].tokenURI);
        }
        setRedeemed(id);
    }

    function getWinner(uint256 challengeId) public view returns (address) {
        require(
            block.timestamp >= challenges[challengeId].end,
            "ChallengeManager: challenge did not end yet"
        );
        return challenges[challengeId].first;
    }

    function getAllChallenges() public view returns (Challenge[] memory) {
        Challenge[] memory array = new Challenge[](counter);
        for (uint256 i = 0; i < array.length; i++) {
            array[i].id = challenges[i].id;
            array[i].creator = challenges[i].creator;
            array[i].start = challenges[i].start;
            array[i].end = challenges[i].end;
            array[i].currentParticipantsCount = challenges[i]
                .currentParticipantsCount;
            array[i].maxParticipantsCount = challenges[i].maxParticipantsCount;
            array[i].fee = challenges[i].fee;
            array[i].price = challenges[i].price;
            array[i].first = challenges[i].first;
            array[i].redeemed = challenges[i].redeemed;
        }
        return array;
    }

    function getChallengeRuleSet(uint256 challengeId)
        external
        view
        returns (Rules memory)
    {
        return rules[challengeId];
    }

    function getMaxParticipants(uint256 challengeId)
        public
        view
        returns (uint256)
    {
        return challenges[challengeId].maxParticipantsCount;
    }

    function getCurrentParticipants(uint256 challengeId)
        public
        view
        returns (uint256)
    {
        return challenges[challengeId].currentParticipantsCount;
    }

    function getEndOfChallenge(uint256 challengeId)
        public
        view
        returns (uint256)
    {
        return challenges[challengeId].end;
    }

    function getStartOfChallenge(uint256 challengeId)
        public
        view
        returns (uint256)
    {
        return challenges[challengeId].start;
    }

    function getLeaderboard(uint256 challengeId)
        external
        view
        returns (LeaderboardEntry[] memory)
    {
        return leaderboards[challengeId];
    }

    function typeToString(uint32 t) internal pure returns (string memory) {
        if (t == 0) {
            return "row";
        } else if (t == 1) {
            return "ski";
        } else if (t == 2) {
            return "bike";
        } else if (t == 3) {
            return "paddle";
        } else if (t == 4) {
            return "water";
        } else if (t == 5) {
            return "snow";
        } else if (t == 6) {
            return "waterski";
        } else if (t == 7) {
            return "slides";
        } else if (t == 8) {
            return "dynamic";
        } else {
            require(false, "ChallengeManager: challenge type not specified");
            return "no_type";
        }
    }
}
