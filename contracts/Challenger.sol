// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

// import "./interfaces/unlock/IPublicLock.sol";
import "./ChallengeManager.sol";

contract Challenger {
    ChallengeManager internal manager;

    mapping(bytes32 => uint256) public requests; // todo add data and time

    constructor(address adr) {
        manager = ChallengeManager(adr);

        manager.setChallenger(address(this));
    }

    event PrizeReceived(address winner);

    function submitData(
        uint256 challengeId,
        uint32[] calldata conditions,
        uint32[] calldata time
    ) external payable {
        // IPublicLock lock = manager.getLock(challengeId);
        // require(address(lock) != address(0), "Challenger: lock does not exist yet");
        require(
            time.length == conditions.length,
            "Challenger: argument array lengths not matching"
        );
        require(
            manager.getEndOfChallenge(challengeId) > block.timestamp,
            "Challenger: challenge already over"
        );
        require(
            manager.getStartOfChallenge(challengeId) < block.timestamp,
            "Challenger: challenge not started yet"
        );

        bool withUnlock = false;
        uint256 keyPrice = 0;
        if (!manager.hasUnlockedChallenge(challengeId, msg.sender)) {
            require(
                manager.getCurrentParticipants(challengeId) <
                    manager.getMaxParticipants(challengeId),
                // || manager.getMaxParticipants(challengeId) == 0
                "Challenger: challenge is already full"
            );

            require(
                msg.value >= manager.getSubmissionFee(challengeId),
                "Challenger: entered fee too low"
            );

            keyPrice = manager.getKeyPrice(challengeId);
            manager.sendGymnasiaFee{value: msg.value - keyPrice}();

            withUnlock = true;
        } else {
            manager.sendGymnasiaFee{value: msg.value}();
        }

        manager.addLeaderboardEntry{value: keyPrice}(
            challengeId,
            msg.sender,
            conditions,
            time,
            withUnlock
        );
    }

    function receivePrize(uint256 challengeId) external {
        require(
            isWinner(challengeId),
            "Challanger: Sorry you are not the winner"
        );

        manager.withdraw(challengeId, msg.sender);

        // IPublicLock lock = manager.getLock(challengeId);
        // lock.updateBeneficiary(msg.sender);
        // lock.withdraw(address(0), 0); //address(0) => caller is target, 0 => all in the lock

        // manager.setRedeemed(challengeId);
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
        return manager.hasUnlockedChallenge(challengeId, challenger);
    }
}
