// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Evaluation.sol";

contract MinSingleTimeEvaluation is Evaluation {
    constructor(address adr) public Evaluation(adr) {}

    function evaluate(ChallengeManager.LeaderboardEntry[] memory entry)
        public
        returns (address)
    {
        require(entry.length > 0, "EMPTY_ARRAY");
        address challenger = entry[0].challenger;
        if (entry.length == 1) return challenger;

        uint256 first = entry[0].time[0];

        for (uint256 i = 1; i < entry.length; i++) {
            if (entry[i].time[0] < first) {
                first = entry[i].time[0];
                challenger = entry[i].challenger;
            }
        }
        return challenger;
    }
}
