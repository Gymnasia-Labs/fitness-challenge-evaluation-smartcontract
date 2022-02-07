// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./interfaces/unlock/IPublicLock.sol";
import "./interfaces/unlock/IUnlock.sol";

abstract contract LockFactory {
    IUnlock internal unlock;

    mapping(uint256 => IPublicLock) lockToId;

    constructor() {
        unlock = IUnlock(0x1dA6c13515362B42ACb1Ad24a713f74f925F3AEB);
    }

    function createNewLock(
        string memory name,
        uint256 id,
        uint256 duration,
        uint256 price,
        uint256 numberOfKeys
    ) internal {

        IPublicLock lock = IPublicLock(
            address(
                uint160(
                    unlock.createLock(
                        duration,
                        address(0), //todo check if right
                        price,
                        numberOfKeys,
                        name,
                        bytes12(keccak256(abi.encodePacked(id)))
                    )
                )
            )
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
