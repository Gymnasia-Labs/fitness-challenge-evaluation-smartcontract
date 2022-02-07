// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./Evaluation.sol";

contract MinTimeEvaluation is Evaluation {
    constructor(address adr) Evaluation(adr) {
        specificDescriptionPart = "in the shortest amount of time.";
    }

    function evaluate(ChallengeManager.LeaderboardEntry[] memory entry)
        public
        override
        pure
        returns (address)
    {
        require(entry.length > 0, "MinTimeEvaluation: empty leaderboard");
        address challenger = entry[0].challenger;
        if (entry.length == 1) return challenger;

        uint256 i;
        uint256 j;
        uint256 sum = 0;
        uint256 min = 0;

        for (i = 0; i < entry[0].time.length; i++) {
            min += entry[0].time[i];
        }

        for (i = 1; i < entry.length; i++) {
            for (j = 0; j < entry[i].time.length; j++) {
                sum += entry[i].time[j];
            }
            if (sum < min) {
                min = sum;
                challenger = entry[i].challenger;
            }
            sum = 0;
        }
        return challenger;
    }
}
