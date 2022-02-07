// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./ChallengeManager.sol";
import "./Ownable.sol";

abstract contract Evaluation is Ownable{
    address public manager;
    string internal specificDescriptionPart;

    mapping(uint256 => uint32[]) public ruleset;

    constructor(address adr) {
        manager = adr;
    }

    function setChallengeManager(address adr) external onlyOwner {
        manager = adr;
    }

    function getSpecificDescriptionPart() public view returns (string memory) {
        return specificDescriptionPart;
    }

    function evaluate(ChallengeManager.LeaderboardEntry[] calldata entry)
        external
        virtual
        view
        returns (address);

    function setRules(uint256 challengeId, uint32[] memory rules) public {
        require(msg.sender == manager, "Evaluation: caller is not challenge manager");
        ruleset[challengeId] = rules;
    }

    function checkRules(uint256 challengeId, uint32[] memory rules)
        public
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
