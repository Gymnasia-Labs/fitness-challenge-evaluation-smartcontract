// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./ChallengeManager.sol";

contract Evaluation {
    uint256 ruleset;

    function evaluate(ChallengeManager.LeaderboardEntry[] calldata entry)
        external
        returns (address);

    function setRules(uint256 rules) public {
        ruleset = rules;
    }

    function checkRules(uint256 rules) public view returns (bool) {
        return ruleset == rules;
    }
}
