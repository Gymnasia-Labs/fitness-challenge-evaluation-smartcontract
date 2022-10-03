// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./Evaluation.sol";

contract MinTimeEvaluation is Evaluation {

    constructor(address adr) Evaluation(adr) {
        multiSubmitAllowed = false;
    }

    function evaluate(ChallengeManager.LeaderboardEntry[] memory entrys)
        public
        override
        pure
        returns (address)
    {
        require(entrys.length > 0, "MinTimeEvaluation: empty leaderboard");
        address challenger = entrys[0].challenger;
        if (entrys.length == 1) return challenger;

        uint256 i;
        uint256 j;
        uint256 sum = 0;
        uint256 min = 0;

        for (i = 0; i < entrys[0].values.length; i++) {
            min += entrys[0].values[i];
        }

        for (i = 1; i < entrys.length; i++) {
            for (j = 0; j < entrys[i].values.length; j++) {
                sum += entrys[i].values[j];
            }
            if (sum < min) {
                min = sum;
                challenger = entrys[i].challenger;
            }
            sum = 0;
        }
        return challenger;
    }
}
