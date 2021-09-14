// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./ChallengeManager.sol";

contract Challenger {
    ChallengeManager internal manager;

    constructor(address adr) public {
        manager = ChallengeManager(adr);
    }

    function unlockChallenge(uint256 id) public payable {
        IPublicLock lock = manager.getLock(id);
        require(address(lock) != address(0), "NO_LOCK_WITH_THIS_KEY");
        lock.purchase.value(msg.value)(
            lock.keyPrice(),
            msg.sender,
            0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B,
            "0x00"
        );
    }

    function submitData(
        uint256 id,
        uint32 data,
        uint256 time
    ) external returns (bool) {
        IPublicLock lock = manager.getLock(id);
        bool withUnlock = false;

        if (!lock.getHasValidKey(msg.sender)) {
            unlockChallenge(id);
            withUnlock = true;
        }

        manager.addLeaderboardEntry(id, msg.sender, data, time, withUnlock);
    }

    function receivePrice(uint256 challengeId) external view {
        require(isWinner(challengeId), "Not the winner");
        IPublicLock lock = manager.getLock(challengeId);
        //add lock withdraw
    }

    function isWinner(uint256 challengeId) public view returns (bool) {
        return msg.sender == manager.getWinner(challengeId);
    }
}
