// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./ChallengeManager.sol";

contract Challenger {
    ChallengeManager manager;

    constructor(address adrManager) public {
        manager = ChallengeManager(adrManager);
    }

    function unlockChallenge(bytes32 key) external payable {
        IPublicLock lock = manager.getLock(key);
        require(address(lock) != address(0), "NO_LOCK_WITH_THIS_KEY");

        lock.purchase.value(msg.value)(
            lock.keyPrice(),
            msg.sender,
            0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B,
            "0x00"
        );
    }

    function submitData(
        bytes32 key,
        uint32 data,
        uint256 time
    ) external returns (bool) {
        manager.addLeaderboardEntry(key, msg.sender, data, time);
    }

    function receivePrice(uint256 challengeId) external {}
}
