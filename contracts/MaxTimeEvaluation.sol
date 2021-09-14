// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Evaluation.sol";

contract MaxTimeEvaluation is Evaluation {
    function evaluate(ChallengeManager.LeaderboardEntry[] memory entry)
        public
        returns (address)
    {
        address firstAdr = entry[0].challenger;
        if (entry.length == 1) return firstAdr;
        uint256 first = entry[0].time;
        for (uint256 i = 1; i < entry.length; i++) {
            if (first < entry[i].time) {
                first = entry[i].time;
                firstAdr = entry[i].challenger;
            }
        }
        return firstAdr;
    }
}
