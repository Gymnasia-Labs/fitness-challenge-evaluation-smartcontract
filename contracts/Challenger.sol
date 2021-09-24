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
        uint32[] calldata data,
        uint32[] calldata time
    ) external payable returns (bool) {
        IPublicLock lock = manager.getLock(challengeId);
        require(address(lock) != address(0), "THERE_IS_NO_LOCK");

        require(
            manager.getEndOfChallenge(challengeId) > block.timestamp,
            "CHALLENGE_ALREADY_OVER"
        );
        require(
            manager.getStartOfChallenge(challengeId) < block.timestamp,
            "CHALLENGE_NOT_STARTED_YET"
        );

        bool withUnlock = false;

        if (!lock.getHasValidKey(msg.sender)) {
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
        lock.updateBeneficiary(msg.sender);
        lock.withdraw(address(0), 0);

        // lock.updateBeneficiary(address(this));
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
