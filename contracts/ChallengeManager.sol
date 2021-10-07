// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Evaluation.sol";
import "./LockFactory.sol";
import "./Challenger.sol";

contract ChallengeManager is LockFactory {
    uint256 counter = 0;
    Challenger challenger;
    uint256 public gymnasiaFee = 10; //percentage so always divide by 100 before

    struct Challenge {
        uint256 id;
        address creator;
        string title;
        string description;
        uint256 start;
        uint256 end;
        uint256 currentParticipantsCount;
        uint256 maxParticipantsCount;
        uint256 fee;
        uint256 price;
        address first;
        bool redeemed;
    }

    struct Rules {
        uint32[] types;
        uint32[] condition;
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

    function setChallenger(address adr) public {
        challenger = Challenger(adr);
    }

    function setRedeemed(uint256 challengeId) public {
        require(msg.sender == challenger.getAddress(), "NOT_CHALLENGER");
        challenges[challengeId].redeemed = true;
    }

    function setGymnasiaFee(uint256 percentage) external {
        require(
            percentage >= 0 && percentage <= 100,
            "INPUT_HAS_TO_BE_BETWEEN_100_AND_0"
        );
        gymnasiaFee = percentage;
    }

    function createChallenge(
        string calldata title,
        uint32[] calldata types,
        uint32[] calldata condition,
        uint256 start,
        uint256 end,
        uint256 maxParticipantsCount,
        uint256 fee,
        address evaluationAdr
    ) external returns (Challenge memory) {
        //todo keys could be bought before start time through unlock contract
        require(start > block.timestamp, "START_TIME_IN_THE_PAST"); //start
        require(end > start, "END_TIME_BEFORE_START_TIME");
        require(
            types.length == condition.length,
            "RULE_LENGTHS_IN_CREATION_INPUT_NOT_MATCHING"
        );
        uint256 gymnasiaFeeInPercentage = (fee / 100) * gymnasiaFee;
        createNewLock(
            counter,
            end - start,
            gymnasiaFeeInPercentage,
            maxParticipantsCount
        );

        rules[counter] = Rules(types, condition);

        challenges[counter].id = counter;
        challenges[counter].creator = msg.sender;
        challenges[counter].title = title;
        challenges[counter]
            .description = "In this challenge you need to row 2000m in the shortes amount of time.";
        challenges[counter].start = start;
        challenges[counter].end = end;
        challenges[counter].maxParticipantsCount = maxParticipantsCount;
        challenges[counter].fee = fee;
        evaluations[counter] = Evaluation(evaluationAdr);

        evaluations[counter].setRules(counter, condition);
        lockToId[counter].addLockManager(challenger.getAddress());

        return challenges[counter++];
    }

    function addLeaderboardEntry(
        uint256 challengeId,
        address sender,
        uint32[] memory data,
        uint32[] memory time,
        bool withUnlock
    ) public {
        require(msg.sender == challenger.getAddress(), "NOT_CHALLENGER");
        require(
            evaluations[challengeId].checkRules(challengeId, data),
            "WRONG DATA FOR THIS RULESET"
        );
        leaderboards[challengeId].push(LeaderboardEntry(sender, data, time));

        if (withUnlock) {
            challenges[challengeId].price += challenges[challengeId].fee;
            challenges[challengeId].currentParticipantsCount++;
        }

        challenges[challengeId].first = evaluations[challengeId].evaluate(
            leaderboards[challengeId]
        );
    }

    function getWinner(uint256 challengeId) public view returns (address) {
        require(
            block.timestamp >= challenges[challengeId].end,
            "CHALLENGE_NOT_ENDED_YET"
        );
        return challenges[challengeId].first;
    }

    function getAllChallenges() public view returns (Challenge[] memory) {
        Challenge[] memory array = new Challenge[](counter);
        for (uint256 i = 0; i < array.length; i++) {
            array[i].id = challenges[i].id;
            array[i].creator = challenges[i].creator;
            array[i].title = challenges[i].title;
            array[i].description = challenges[i].description;
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
}
