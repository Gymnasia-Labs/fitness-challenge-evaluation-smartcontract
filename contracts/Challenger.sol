// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./interfaces/unlock/IPublicLock.sol";
import "./ChallengeManager.sol";

contract Challenger {
    ChallengeManager internal manager;

    constructor(address adr) public {
        manager = ChallengeManager(adr);

        manager.setChallenger(address(this));
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

    function receivePrice(uint256 challengeId) external {
        require(isWinner(challengeId), "Not the winner");
        IPublicLock lock = manager.getLock(challengeId);
        // lock.withdraw(msg.sender, 0);
        lock.updateBeneficiary(msg.sender);
    }

    function isWinner(uint256 challengeId) public view returns (bool) {
        return msg.sender == manager.getWinner(challengeId);
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function hasUnlockedChallenge(uint256 challengeId, address challenger)
        external
        view
        returns (bool)
    {
        return manager.getLock(challengeId).getHasValidKey(challenger);
    }
}
