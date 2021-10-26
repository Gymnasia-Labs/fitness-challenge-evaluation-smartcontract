// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./ChallengeManager.sol";

contract Evaluation {
    address public manager;
    address public owner;
    string internal specificDescriptionPart;

    mapping(uint256 => uint32[]) public ruleset;

    constructor(address adr) public {
        manager = adr;
        owner = msg.sender;
    }

    function setChallengeManager(address adr) external {
        require(msg.sender == owner, "NOT_OWNER");
        manager = adr;
    }

    function getSpecificDescriptionPart() public view returns (string memory) {
        return specificDescriptionPart;
    }

    function evaluate(ChallengeManager.LeaderboardEntry[] calldata entry)
        external
        returns (address);

    function setRules(uint256 challengeId, uint32[] memory rules) public {
        require(msg.sender == manager, "NOT_CHALLENGE_MANAGER");
        ruleset[challengeId] = rules;
    }

    function checkRules(uint256 challengeId, uint32[] memory rules)
        public
        view
        returns (bool)
    {
        require(
            ruleset[challengeId].length == rules.length,
            "RULES_LENGTH_DOES_NOT_MATCH"
        );

        for (uint256 i = 0; i < rules.length; i++)
            if (ruleset[challengeId][i] != rules[i]) return false;

        return true;
    }
}
