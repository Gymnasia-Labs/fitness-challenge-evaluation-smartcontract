// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./ChallengeManager.sol";
import "./Ownable.sol";

contract Evaluation is Ownable{
    address public manager;
    bool public multiSubmitAllowed = false;

    mapping(uint256 => uint32[]) public ruleset;

    constructor(address adr) {
        manager = adr;
    }

    function setChallengeManager(address adr) external onlyOwner {
        manager = adr;
    }

    function evaluate(ChallengeManager.LeaderboardEntry[] calldata entrys)
        external
        virtual
        view
        returns (address) {
            require(false, "Evaluation: don't run this method, class is abstract (pseudo abstract because of polymorphie purpose)");
            if (entrys.length == 0) return address(0); //just to remove warning
            else return address(0);
        }

    function setRules(uint256 challengeId, uint32[] memory rules) public {
        require(msg.sender == manager, "Evaluation: caller is not challenge manager");
        ruleset[challengeId] = rules;
    }

    function checkRules(uint256 challengeId, uint32[] memory rules)
        public
        virtual
        view
        returns (bool)
    {
        require(
            ruleset[challengeId].length == rules.length,
            "Evaluation: rules lengths does not match"
        );

        for (uint256 i = 0; i < rules.length; i++)
            if (ruleset[challengeId][i] != rules[i]) return false;

        return true;
    }
}
