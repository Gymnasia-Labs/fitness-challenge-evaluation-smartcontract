// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/GSN/Context.sol";
import "./Evaluation.sol";
import "./LockFactory.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ChallengeManager is LockFactory, ERC721 {
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
        // Evaluation evaluation;
        // LeaderboardEntry[] leaderBoard;
    }

    struct LeaderboardEntry {
        address challenger;
        uint256 data;
        uint256 time;
    }

    mapping(uint256 => Challenge) public challenges;

    function createChallenge(
        string calldata title,
        string calldata description,
        uint256 start,
        uint256 end,
        uint256 participantsCount,
        uint256 price
        // Evaluation evaluation
    ) external {
        createNewLock(
            bytes32(counter++),
            end - start,
            price,
            participantsCount
        );
        Challenge memory challenge = Challenge(
            msg.sender,
            title,
            description,
            start,
            end,
            participantsCount,
            price,
            address(0)
            // evaluation
        );
        uint tokenId = counter++;
        challenges[counter++] = challenge;
        _safeMint(msg.sender, tokenId);
        // return challenge;
    }

    function ownerOf(
      uint256 tokenId
    ) public view returns (address) {
        return ownerOf(tokenId);
    }

    function addLeaderboardEntry(
        bytes32 key,
        address sender,
        uint256 data,
        uint256 time
    ) public {
    //     challenges[key].leaderBoard.push(LeaderboardEntry(sender, data, time));
    }

    function getWinner(uint256 challengeKey) public view returns (address) {
        return challenges[challengeKey].winner;
    }
}
