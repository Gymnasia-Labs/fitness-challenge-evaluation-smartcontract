// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./Evaluation.sol";

contract MaxDistanceEvaluation is Evaluation {

    constructor(address adr) Evaluation(adr) {
        multiSubmitAllowed = true;
    }

    function evaluate(ChallengeManager.LeaderboardEntry[] memory entrys)
        public
        override
        pure
        returns (address)
    {
        require(entrys.length > 0, "MaxDistanceEvaluation: empty leaderboard");
        address challenger;

        challenger = entrys[0].challenger;
        if (entrys.length == 1) return challenger;

        // bool isAlreadyInArray = false;
        // address[] memory challengers = new address[](entry.length);


        // for (uint256 i = 0; i < entry.length; i++) {
        //     for (uint256 j = 0; j < i; j++) {
        //         if(entry[i].challenger == challengers[j]){
        //             isAlreadyInArray = true;
        //         }
        //     }
        //     if (!isAlreadyInArray)
        //         challengers[i] = entry[i].challenger;
        // }

        // for (uint256 i = 0; i < challengers.length; i++) {
        //     for (uint256 j = 0; j < entry.length; j++) {
        //         if(entry[j].challenger == challengers[i]){
        //             distances[i] += entry[j].values[0];
        //         }
        //     }
        // }

        // for (uint256 i = 0; i < distances.length; i++) {
        //     if(max<distances[i]){
        //         max = distances[i];
        //         challenger = challengers[i];
        //     }
        // }
        uint32[] memory distances = new uint32[](entrys.length);
        uint32 counter = 0;
        uint32 max = 0;

        for (uint32 i = 1; i < entrys.length; i++) {
            if(entrys[i-1].challenger == entrys[i].challenger){
                distances[counter] += entrys[i-1].values[0] + entrys[i].values[0];
            }else{
                ++counter;
            }

            if(max < distances[counter]){
                max = distances[counter];
                challenger = entrys[i].challenger;
            }
        }

        return challenger;
    }

    function checkRules(uint256 challengeId, uint32[] memory rules)
        public
        override
        pure
        returns (bool)
    {
        //does not matter -> just to remove warning of missing inputs
        if(challengeId == 0 || rules.length == 0) {
            return true;
        }

        return true;
    }
}