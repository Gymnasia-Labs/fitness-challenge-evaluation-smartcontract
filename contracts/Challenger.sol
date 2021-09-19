// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./ChallengeManager.sol";

contract Challenger {
    ChallengeManager internal manager;

    constructor(address adr) public {
        manager = ChallengeManager(adr);
    }

    function submitData(
        uint256 challengeId,
        uint32 data,
        uint256 time
    ) external payable returns (bool) {
        IPublicLock lock = manager.getLock(challengeId);
        bool withUnlock = false;

        if (!lock.getHasValidKey(msg.sender)) {
            require(address(lock) != address(0), "NO_LOCK_WITH_THIS_KEY");
            require(
                manager.getCurrentParticipants(challengeId) <
                    manager.getMaxParticipants(challengeId),
                // || manager.getMaxParticipants(challengeId) == 0
                "CHALLENGE_FULL"
            );
            lock.purchase.value(msg.value)(
                lock.keyPrice(),
                msg.sender,
                0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B,
                "0x00"
            );
            withUnlock = true;
        }

        manager.addLeaderboardEntry(
            challengeId,
            msg.sender,
            data,
            time,
            withUnlock
        );
    }

    function receivePrice(uint256 challengeId) external view {
        require(isWinner(challengeId), "Not the winner");
        // IPublicLock lock = manager.getLock(challengeId);
        //add lock withdraw
    }

    function isWinner(uint256 challengeId) public view returns (bool) {
        return msg.sender == manager.getWinner(challengeId);
    }
}
