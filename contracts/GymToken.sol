// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Ownable.sol";
import "./ChallengeManager.sol";

contract GymToken is Ownable, ERC1155 {
    ChallengeManager manager;

    modifier onlyChallengeManagerOrOwner() {
        require(
            msg.sender == manager.getAddress() || msg.sender == owner(),
            "GymToken: caller is not ChallengeManager"
        );
        _;
    }

    constructor(address adr)
        ERC1155(
            "https://bafybeid3fao5m25b5amoelhabeaqb4lcqmedocpdsfixxf7vjjuzq4l4oi.ipfs.dweb.link/{id}.json"
        )
    {
        manager = ChallengeManager(adr);

        manager.setGymToken(address(this));
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyChallengeManagerOrOwner {
        _mint(to, id, amount, data);
    }
}
