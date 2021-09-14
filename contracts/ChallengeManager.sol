// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Evaluation.sol";
import "./LockFactory.sol";

contract ChallengeManager is LockFactory {
    uint256 counter = 0;
    // only for testing, used to determine which chellenge gets displayed on the frontEnd
    uint256 displayedChallenge = 0;

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
        LeaderboardEntry[] leaderBoard;
        Evaluation evaluation;
    }

    struct LeaderboardEntry {
        address challenger;
        uint256 data; //todo change data to array if multiple challenges in one needed
        uint256 time;
    }

    mapping(uint256 => Challenge) public challenges;

    function setDisplayedChallengeID(uint256 id) external {
        displayedChallenge = id;
    }

    function getDisplayedChallengeID() public view returns (uint256) {
        return displayedChallenge;
    }

    function createChallenge(
        string calldata title,
        string calldata description,
        uint256 rules,
        uint256 start,
        uint256 end,
        uint256 maxParticipantsCount,
        uint256 fee,
        address evaluationAdr
    ) external returns (Challenge memory) {
        createNewLock(counter, end - start, fee, maxParticipantsCount);

        challenges[counter].id = counter;
        challenges[counter].creator = msg.sender;
        challenges[counter].title = title;
        challenges[counter].description = description;
        challenges[counter].start = start;
        challenges[counter].end = end;
        challenges[counter].maxParticipantsCount = maxParticipantsCount;
        challenges[counter].fee = fee;
        challenges[counter].evaluation = Evaluation(evaluationAdr);

        challenges[counter].evaluation.setRules(rules);

        return challenges[counter++];
    }

    function addLeaderboardEntry(
        uint256 id,
        address sender,
        uint256 data,
        uint256 time,
        bool withUnlock
    ) public {
        require(
            challenges[id].evaluation.checkRules(data),
            "WRONG DATA FOR THIS RULESET"
        );
        challenges[id].leaderBoard.push(LeaderboardEntry(sender, data, time));

        if (withUnlock) challenges[id].price += challenges[id].fee;

        challenges[id].first = challenges[id].evaluation.evaluate(
            challenges[id].leaderBoard
        );
    }

    function getWinner(uint256 challengeId) public view returns (address) {
        require(block.timestamp >= challenges[challengeId].end);
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
            array[i].leaderBoard = challenges[i].leaderBoard;
            array[i].fee = challenges[i].fee;
            array[i].first = challenges[i].first;
        }
        return array;
    }
}
