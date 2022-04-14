// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Ownable.sol";
import "./ChallengeManager.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GymToken is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    ChallengeManager manager;

    modifier onlyChallengeManagerOrOwner() {
        require(
            msg.sender == manager.getAddress() || msg.sender == owner(),
            "GymToken: caller is not ChallengeManager"
        );
        _;
    }

    constructor(address adr) ERC721("GymWalletToken", "GWT") {
        manager = ChallengeManager(adr);

        manager.setGymToken(address(this));
    }

    function mint(address player, string memory _tokenURI)
        public
        onlyChallengeManagerOrOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

// contract GymToken is Ownable, ERC1155 {
//     constructor(address adr)
//         ERC1155(
//             "https://bafybeid3fao5m25b5amoelhabeaqb4lcqmedocpdsfixxf7vjjuzq4l4oi.ipfs.dweb.link/{id}.json"
//         )
//     {
//     }

//     function mint(
//         address to,
//         uint256 id,
//         uint256 amount,
//         bytes memory data
//     ) external onlyChallengeManagerOrOwner {
//         _mint(to, id, amount, data);
//     }

//     function uri(uint256 _tokenid)
//         public
//         pure
//         override
//         returns (string memory)
//     {
//         return
//             string(
//                 abi.encodePacked(
//                     "https://bafybeid3fao5m25b5amoelhabeaqb4lcqmedocpdsfixxf7vjjuzq4l4oi.ipfs.dweb.link/",
//                     Strings.toString(_tokenid),
//                     ".json"
//                 )
//             );
//     }
// }
