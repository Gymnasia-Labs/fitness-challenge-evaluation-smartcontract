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
    address payable public gymnasiaAddress;

    struct Challenge {
        uint256 id; //todo remove if not needed in frontend
        address creator;
        uint256 start;
        uint256 end;
        uint256 currentParticipantsCount;
        uint256 maxParticipantsCount;
        uint256 submissionFee;
        uint256 prizePool;
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
        uint32[] data;
        uint32[] time;
    }

    mapping(uint256 => LeaderboardEntry[]) public leaderboards;
    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => Rules) internal rules;
    mapping(uint256 => Evaluation) public evaluations;
    mapping(uint256 => address[]) public whiteLists;

    mapping(uint256 => mapping(address => bool)) public challengeKeys;

    event ChallengeCreated(Challenge challenge);
    event LeaderboardEntryAdded(LeaderboardEntry leaderboardEntry);


    constructor(address adr) {
        gymnasiaAddress = payable(adr);
    }

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

    function setGymnasiaAddress(address adr) public onlyOwner {
        gymnasiaAddress = payable(adr);
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

    function sendGymnasiaFee() public payable {
        bool sent = gymnasiaAddress.send(msg.value);
        require(sent, "Challenger: Failed to send ether");
    }

    function getKeyPrice(uint256 id) public view returns (uint256) {
        uint256 submissionFee = getSubmissionFee(id);
        submissionFee = submissionFee - (submissionFee / 100) * gymnasiaFee;
        return submissionFee;
    }

    function getSubmissionFee(uint256 challengeId) public view returns (uint256) {
        return challenges[challengeId].submissionFee;
    }

    //just for reuse purpose
    function _createChallenge(
        uint32[] calldata types,
        uint32[] calldata conditions,
        uint256 start,
        uint256 end,
        uint256 maxParticipantsCount,
        uint256 submissionFee,
        address evaluationAdr,
        address[] memory whiteList
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
        challenges[counter].submissionFee = submissionFee;
        evaluations[counter] = Evaluation(evaluationAdr);

        evaluations[counter].setRules(counter, conditions);
        whiteLists[counter] = whiteList;

        emit ChallengeCreated(challenges[counter]);

        return challenges[counter];
    }

    function createChallenge(
        uint32[] calldata types,
        uint32[] calldata conditions,
        uint256 start,
        uint256 end,
        uint256 maxParticipantsCount,
        uint256 submissionFee,
        address evaluationAdr,
        address[] memory whiteList
    ) external payable returns (Challenge memory) {
        _createChallenge(
                types,
                conditions,
                start,
                end,
                maxParticipantsCount,
                submissionFee,
                evaluationAdr,
                whiteList
        );
        challenges[counter].prizePool += msg.value;
        return challenges[counter++];
    }

    function createChallengeWithNFT(
        uint32[] calldata types,
        uint32[] calldata conditions,
        uint256 start,
        uint256 end,
        uint256 maxParticipantsCount,
        uint256 submissionFee,
        address evaluationAdr,
        string memory tokenURI,
        address[] memory whiteList
    ) external payable returns (Challenge memory) {
        _createChallenge(
            types,
            conditions,
            start,
            end,
            maxParticipantsCount,
            submissionFee,
            evaluationAdr,
            whiteList
        );
        challenges[counter].tokenURI = tokenURI;
        challenges[counter].prizePool += msg.value;
        return challenges[counter++];
    }

    //todo add prefunded by ... to get who prefunded the challenge
    function prefundChallenge(
        uint256 challengeId
    ) external payable {
        require(challenges[challengeId].end > block.timestamp, "ChallangeManager: challenge already ended");
        require(challenges[challengeId].start > block.timestamp, "ChallangeManager: challenge already started");
        challenges[challengeId].prizePool += msg.value;
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

        if (whiteLists[challengeId].length != 0){
            bool addressFound = false;
            for (uint256 i = 0; i < whiteLists[challengeId].length; i++) {
                if (whiteLists[challengeId][i] == sender){
                    addressFound = true;
                    break;
                }
            }
            require(addressFound, 'ChallengeManager: Not in whitelist');
        }

        if (withUnlock) {
            challenges[challengeId].prizePool += msg.value;
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
        bool sent = payable(winner).send(challenges[id].prizePool);
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
            array[i].submissionFee = challenges[i].submissionFee;
            array[i].prizePool = challenges[i].prizePool;
            array[i].first = challenges[i].first;
            array[i].redeemed = challenges[i].redeemed;
            array[i].tokenURI = challenges[i].tokenURI;
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
}
