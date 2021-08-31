// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

contract ChallengerManager {
    struct Challenge {
        uint256 id;
        string title;
        string description;
        string image;
        string creator;
        uint256 creationTime;
        uint256 start;
        uint256 end;
        uint256 participantsCount;
        uint256 price;
        address winner;
    }

    function createChallenge(string memory description) external {}

    function getWinner(uint256 challengeId) public view returns (address) {}
}
