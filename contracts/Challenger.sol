// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

contract Challenger {
    function unlockChallenge() external {}

    function submitData(uint32 data, uint256 time) external returns (bool) {}

    function receivePrice(uint256 challengeId) external {}
}
