// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Evaluation.sol";
import "./LockFactory.sol";
import "./Challenger.sol";
import "./StringUtils.sol";

contract ChallengeManager is LockFactory {
    using StringUtils for string;

    uint256 counter = 0;
    Challenger challenger;
    uint256 public gymnasiaFee = 10; //percentage so always divide by 100 before

    struct Challenge {
        uint256 id; //todo remove if not needed in frontend
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

    function getFee(uint256 challengeId) public view returns (uint256) {
        return challenges[challengeId].fee;
    }

    function createChallenge(
        string calldata title,
        uint32[] calldata types,
        uint32[] calldata conditions,
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
            types.length == conditions.length,
            "RULE_LENGTHS_IN_CREATION_INPUT_NOT_MATCHING"
        );
        require(conditions.length > 0, "EMPTY_INPUT");

        uint256 lockFeeInPercentage = fee - (fee / 100) * gymnasiaFee;
        createNewLock(
            counter,
            end - start,
            lockFeeInPercentage,
            maxParticipantsCount
        );

        rules[counter] = Rules(types, conditions);

        challenges[counter].id = counter;
        challenges[counter].creator = msg.sender;
        challenges[counter].title = title;
        challenges[counter].start = start;
        challenges[counter].end = end;
        challenges[counter].maxParticipantsCount = maxParticipantsCount;
        challenges[counter].fee = fee;
        evaluations[counter] = Evaluation(evaluationAdr);

        evaluations[counter].setRules(counter, conditions);

        string memory descriptionOfChallenge = "In this challenge you need to ";

        /*for (uint256 i = 0; i < conditions.length; i++) {
            descriptionOfChallenge.strConcat(
                typeToString(types[i]),
                " ",
                StringUtils.uint2Str(conditions[0])
            );
            descriptionOfChallenge.strConcat("m");

            if (i != 0) descriptionOfChallenge.strConcat(" and ");
        }*/

        descriptionOfChallenge.strConcat(
            evaluations[counter].getSpecificDescriptionPart()
        );

        challenges[counter].description = descriptionOfChallenge;

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
            challenges[challengeId].price += getKeyPrice(challengeId);
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

    function getRedeemed(uint256 challengeId) public view returns (bool) {
        return challenges[challengeId].redeemed;
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
            require(false, "TYPE_NOT_SPECIFIED");
        }
    }
}
