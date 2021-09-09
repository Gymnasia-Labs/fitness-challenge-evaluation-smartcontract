// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Evaluation.sol";
import "./LockFactory.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ChallengeManager is LockFactory, ERC721 {
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
        uint256 participantsCount;
        uint256 price;
        address first;
        LeaderboardEntry[] leaderBoard;
        Evaluation evaluation;
    }

    struct LeaderboardEntry {
        address challenger;
        uint256 data;
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
        uint256 start,
        uint256 end,
        uint256 participantsCount,
        uint256 price,
        address evaluationAdr
    ) external returns (Challenge memory) {
        createNewLock(counter, end - start, price, participantsCount);

        challenges[counter].id = counter;
        challenges[counter].creator = msg.sender;
        challenges[counter].title = title;
        challenges[counter].description = description;
        challenges[counter].start = start;
        challenges[counter].end = end;
        challenges[counter].participantsCount = participantsCount;
        challenges[counter].price = price;
        challenges[counter].evaluation = Evaluation(evaluationAdr);

        // mint nft
        _safeMint(msg.sender, counter);

        return challenges[counter++];
    }

    function addLeaderboardEntry(
        uint256 id,
        address sender,
        uint256 data,
        uint256 time
    ) public {
        challenges[id].leaderBoard.push(LeaderboardEntry(sender, data, time));
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
            array[i].participantsCount = challenges[i].participantsCount;
            array[i].price = challenges[i].price;
            array[i].first = challenges[i].first;
        }
        return array;
    }
}
