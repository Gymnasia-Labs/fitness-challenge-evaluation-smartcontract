// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Evaluation.sol";
import "./LockFactory.sol";

contract ChallengeManager is LockFactory {
    uint256 counter = 0;

    struct Challenge {
        address creator;
        string title;
        string description;
        uint256 start;
        uint256 end;
        uint256 participantsCount;
        uint256 price;
        address winner;
        Evaluation evaluation;
        LeaderboardEntry[] leaderBoard;
    }

    struct LeaderboardEntry {
        address challenger;
        uint256 data;
        uint256 time;
    }

    mapping(bytes32 => Challenge) public challenges;

    function createChallenge(
        string calldata title,
        string calldata description,
        uint256 start,
        uint256 end,
        uint256 participantsCount,
        uint256 price,
        Evaluation evaluation
    ) external {
        createNewLock(
            bytes32(counter++),
            end - start,
            price,
            participantsCount
        );
        // Challenge memory challenge = Challenge(
        //     msg.sender,
        //     title,
        //     description,
        //     start,
        //     end,
        //     participantsCount,
        //     price,
        //     address(0),
        //     evaluation
        // );

        // challenges[bytes32(counter++)] = challenge;
        // return challenge;
    }

    function addLeaderboardEntry

    function getWinner(bytes32 challengeKey) public view returns (address) {
        return challenges[challengeKey].winner;
    }
}
