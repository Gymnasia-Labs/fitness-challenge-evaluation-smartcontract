// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./interfaces/unlock/IPublicLock.sol";
import "./ChallengeManager.sol";

contract Challenger {

    ChallengeManager internal manager;

    mapping(bytes32 => uint256) public requests; // todo add data and time

    constructor(address adr) public {
        manager = ChallengeManager(adr);

        manager.setChallenger(address(this));
    }

    event PrizeReceived(address winner);

    function submitData(
        uint256 challengeId,
        uint32[] calldata conditions,
        uint32[] calldata time
    ) external payable returns (bool) {
        IPublicLock lock = manager.getLock(challengeId);
        require(address(lock) != address(0), "Challenger: lock does not exist yet");
        require(
            time.length == conditions.length,
            "Challenger: argument array lengths not matching"
        );
        require(
            manager.getEndOfChallenge(challengeId) > block.timestamp,
            "Challenger: challenge allready over"
        );
        require(
            manager.getStartOfChallenge(challengeId) < block.timestamp,
            "Challenger: challenge not started yet"
        );

        bool withUnlock = false;

        if (!lock.getHasValidKey(msg.sender)) {
            require(
                manager.getCurrentParticipants(challengeId) <
                    manager.getMaxParticipants(challengeId),
                // || manager.getMaxParticipants(challengeId) == 0
                "Challenger: challenge is already full"
            );
            require(
                msg.value >= manager.getFee(challengeId),
                "Challenger: entered fee too low"
            );
            uint256 gymnasiaFee = msg.value - manager.getKeyPrice(challengeId);

            lock.purchase.value(manager.getKeyPrice(challengeId))(
                // lock.purchase.value(msg.value)(
                lock.keyPrice(),
                msg.sender,
                0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B,
                "0x00"
            );

            bool sent = 0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B.send(
                gymnasiaFee
            );
            require(sent, "Challenger: Failed to send ether");

            withUnlock = true;
        } else {
            bool sent = 0x0d5900731140977cd80b7Bd2DCE9cEc93F8a176B.send(
                msg.value
            );
            require(sent, "Challenger: Failed to send ether");
        }

        manager.addLeaderboardEntry(
            challengeId,
            msg.sender,
            conditions,
            time,
            withUnlock
        );
    }

    function receivePrice(uint256 challengeId) external {
        require(isWinner(challengeId), "Challanger: Sorry you are not the winner");

        IPublicLock lock = manager.getLock(challengeId);
        lock.updateBeneficiary(msg.sender);
        lock.withdraw(address(0), 0);   //address(0) => caller is target, 0 => all in the lock

        manager.setRedeemed(challengeId);
        // lock.updateBeneficiary(address(this));

        emit PrizeReceived(msg.sender);
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
