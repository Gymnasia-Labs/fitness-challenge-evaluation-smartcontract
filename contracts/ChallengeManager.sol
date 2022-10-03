// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./Evaluation.sol";
// import "./LockFactory.sol";
import "./Challenger.sol";
import "./StringUtils.sol";
import "./Ownable.sol";
import "./GymToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ChallengeManager is Ownable {
    using StringUtils for string;

    uint256 counter = 0;
    Challenger challenger;
    GymToken gymToken;
    uint8 internal gymnasiaFee = 10; //percentage so always divide by 100 before
    address payable internal gymnasiaAddress;

    enum Gender {
        UNISEX,
        FEMALE,
        MALE
    }

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
        string tokenURI; //uri for ERC721 NFT
        Gender gender;
        bool multiSubmitAllowed;
        address token; //ERC20 Token Address
    }

    struct Rules {
        uint32[] types;
        uint32[] conditions;
    }

    struct LeaderboardEntry {
        address challenger;
        uint32[] conditions;
        uint32[] values;
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

    modifier onlyChallengerOrSelf() {
        require(
            msg.sender == challenger.getAddress() ||
                msg.sender == address(this),
            "ChallengeManager: caller is not challenger or manager"
        );
        _;
    }

    function setChallenger(address adr) public onlyOwnerOrFirst {
        challenger = Challenger(adr);
    }

    function setGymToken(address adr) public onlyOwnerOrFirstToken {
        gymToken = GymToken(adr);
    }

    function getGymnasiaAddress() external view onlyOwner returns (address) {
        return gymnasiaAddress;
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

    function setGender(uint256 challengeId, Gender gender) public onlyOwner {
        challenges[challengeId].gender = gender;
    }

    function setGymnasiaFee(uint8 percentage) external onlyOwner {
        require(
            percentage >= 0 && percentage <= 100,
            "ChallengeManager: argument out of range -> not between 0 and 100"
        );
        gymnasiaFee = percentage;
    }

    function getGymnasiaFee() public view returns (uint8) {
        return gymnasiaFee;
    }

    function sendGymnasiaFee() public payable {
        bool sent = gymnasiaAddress.send(msg.value);
        require(sent, "Challenger: Failed to send ether");
    }

    function getKeyPrice(uint256 challengeId) public view returns (uint256) {
        uint256 submissionFee = getSubmissionFee(challengeId);
        submissionFee = submissionFee - (submissionFee / 100) * gymnasiaFee;
        return submissionFee;
    }

    function getSubmissionFee(uint256 challengeId)
        public
        view
        returns (uint256)
    {
        return challenges[challengeId].submissionFee;
    }

    //just for reuse purpose
    function _createChallenge(
        Challenge memory challenge,
        uint32[] memory types,
        uint32[] memory conditions,
        address evaluationAdr,
        address[] memory whiteList
    )
        internal
        returns (
            // address token
            Challenge memory
        )
    {
        //todo keys could be bought before start time through unlock contract
        // require(genderType >= 0 && genderType <= uint(Gender.MALE), "ChallengeManager: Gender not available");
        require(
            challenge.start > block.timestamp,
            "ChallangeManager: start in the past"
        ); //start
        require(
            challenge.end > challenge.start,
            "ChallengeManager: end time before start time"
        );
        require(
            types.length == conditions.length,
            "ChallengeManager: the condition count and challenge types count needs to be the same"
        );
        require(
            conditions.length > 0,
            "ChallengeManager: conditions are not allowed to be empty"
        );

        require(
            challenge.maxParticipantsCount == whiteList.length ||
                whiteList.length == 0,
            "ChallengeManager: whitelist not correct"
        );

        //todo check uniqueness of addresses contained in whitelist

        rules[counter] = Rules(types, conditions);

        // challenges[counter] = challenge;
        challenges[counter].id = counter;
        challenges[counter].creator = msg.sender;
        challenges[counter].start = challenge.start;
        challenges[counter].end = challenge.end;
        challenges[counter].maxParticipantsCount = challenge
            .maxParticipantsCount;
        challenges[counter].submissionFee = challenge.submissionFee;
        challenges[counter].gender = challenge.gender;
        challenges[counter].tokenURI = challenge.tokenURI;
        challenges[counter].token = challenge.token;

        if (
            challenges[counter].gender != Gender.FEMALE &&
            challenges[counter].gender != Gender.MALE
        ) challenges[counter].gender = Gender.UNISEX;

        evaluations[counter] = Evaluation(evaluationAdr);

        evaluations[counter].setRules(counter, conditions);
        whiteLists[counter] = whiteList;
        challenges[counter].multiSubmitAllowed = evaluations[counter].multiSubmitAllowed();

        emit ChallengeCreated(challenges[counter]);

        return challenges[counter];
    }

    function createChallenge(
        Challenge memory challenge,
        uint32[] calldata types,
        uint32[] calldata conditions,
        address evaluationAdr,
        address[] memory whiteList,
        uint256 prefundAmount
    ) external payable returns (Challenge memory) {
        _createChallenge(
            challenge,
            types,
            conditions,
            evaluationAdr,
            whiteList
        );
        prefundChallenge(counter, prefundAmount);
        return challenges[counter++];
    }

    //todo add prefunded by ... to get who prefunded the challenge
    function prefundChallenge(uint256 challengeId, uint256 amount)
        public
        payable
    {
        require(
            challenges[challengeId].end > block.timestamp,
            "ChallangeManager: challenge already ended"
        );
        require(
            challenges[challengeId].start > block.timestamp,
            "ChallangeManager: challenge already started"
        );
        if (challenges[challengeId].token == address(0)) {
            challenges[challengeId].prizePool += msg.value;
        } else {
            saveERC20(challengeId, amount);
        }
    }

    function saveERC20(uint256 challengeId, uint256 amount) private {
        IERC20 token = IERC20(challenges[challengeId].token);
        token.transferFrom(msg.sender, address(this), amount);
        challenges[challengeId].prizePool += amount;
    }

    function addLeaderboardEntry(
        uint256 challengeId,
        address sender,
        uint32[] memory conditions,
        uint32[] memory values,
        bool withUnlock
    ) public payable onlyChallenger {
        require(
            evaluations[challengeId].checkRules(challengeId, conditions),
            "ChallengeManager: condition does not match ruleset"
        );

        if (whiteLists[challengeId].length != 0) {
            bool addressFound = false;
            for (uint256 i = 0; i < whiteLists[challengeId].length; i++) {
                if (whiteLists[challengeId][i] == sender) {
                    addressFound = true;
                    break;
                }
            }
            require(addressFound, "ChallengeManager: Not in whitelist");
        }

        if (withUnlock) {
            challenges[challengeId].prizePool += msg.value;
            challenges[challengeId].currentParticipantsCount++;
            challengeKeys[challengeId][sender] = true;
        }

        leaderboards[challengeId].push(LeaderboardEntry(sender, conditions, values));
        quick(leaderboards[challengeId]);

        challenges[challengeId].first = evaluations[challengeId].evaluate(
            leaderboards[challengeId]
        );

        if (
            whiteLists[challengeId].length != 0 &&
            challenges[challengeId].currentParticipantsCount ==
            challenges[challengeId].maxParticipantsCount
        ) {
            challenges[challengeId].end = block.timestamp;
            withdraw(challengeId, challenges[challengeId].first);
        }

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

    function multiSubmitAllowed(uint256 id) public view returns (bool) {
        return challenges[id].multiSubmitAllowed;
    }

    function withdraw(uint256 id, address winner) public onlyChallengerOrSelf {
        require(
            !challenges[id].redeemed,
            "Challengemanager: Challenge already redeemed"
        );
        setRedeemed(id); //it is important that the set Redeemed command is before the sent operation
        if (challenges[id].token == address(0)) {
            bool sent = payable(winner).send(challenges[id].prizePool);
            require(sent, "Challengemanager: Failed to send ether");
        } else {
            IERC20 token = IERC20(challenges[id].token);
            token.transfer(winner, challenges[id].prizePool);
        }
        if (bytes(challenges[id].tokenURI).length > 0) {
            gymToken.mint(winner, challenges[id].tokenURI);
        }
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
            array[i].gender = challenges[i].gender;
            array[i].multiSubmitAllowed = challenges[i].multiSubmitAllowed;
            array[i].token = challenges[i].token;
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

    function getChallengeAmount() external view returns (uint256) {
        return counter;
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

    function quick(LeaderboardEntry[] storage data) internal {
        if (data.length > 1) {
            quickPart(data, 0, data.length - 1);
        }
    }

    function quickPart(LeaderboardEntry[] storage data, uint low, uint high) internal {
        if (low < high) {
            LeaderboardEntry memory pivotVal = data[(low + high) / 2];

            uint low1 = low;
            uint high1 = high;
            for (;;) {
                while (data[low1].challenger < pivotVal.challenger) low1++;
                while (data[high1].challenger > pivotVal.challenger) high1--;
                if (low1 >= high1) break;
                LeaderboardEntry memory temp = data[low1];
                data[low1] = data[high1];
                data[high1] = temp;
                low1++;
                high1--;
            }
            if (low < high1) quickPart(data, low, high1);
            high1++;
            if (high1 < high) quickPart(data, high1, high);
        }
    }
}
