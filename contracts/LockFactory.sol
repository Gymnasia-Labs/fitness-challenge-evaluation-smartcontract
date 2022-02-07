// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./interfaces/unlock/IPublicLock.sol";
import "./interfaces/unlock/IUnlock.sol";

abstract contract LockFactory {
    IUnlock internal unlock;

    mapping(uint256 => IPublicLock) lockToId;

    constructor() {
        unlock = IUnlock(0xD8C88BE5e8EB88E38E6ff5cE186d764676012B0b); //proxy contract
    }

    function createNewLock(
        string memory name,
        uint256 id,
        uint256 duration,
        uint256 price,
        uint256 numberOfKeys
    ) internal {

        IPublicLock lock = IPublicLock(
            unlock.createLock(
                duration,
                address(0), //todo check if right
                price,
                numberOfKeys,
                name,
                bytes12(keccak256(abi.encodePacked(id))))
        );
        lockToId[id] = lock;
    }

    function getKeyPrice(uint256 id) public view returns (uint256) {
        return lockToId[id].keyPrice();
    }

    function getLock(uint256 id) public view returns (IPublicLock) {
        return lockToId[id];
    }
}
