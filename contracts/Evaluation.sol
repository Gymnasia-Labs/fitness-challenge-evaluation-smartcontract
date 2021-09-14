// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./ChallengeManager.sol";

interface Evaluation {
    function evaluate(ChallengeManager.LeaderboardEntry[] calldata entry)
        external
        returns (uint256 id);

    function setRules(string calldata rules) external;
}
