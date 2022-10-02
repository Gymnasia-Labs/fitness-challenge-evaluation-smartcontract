// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./ChallengeManager.sol";
import "./Ownable.sol";

contract Challenger is Ownable {
    ChallengeManager internal manager;
    address internal apiAddress;

    struct ChallengeData {
        uint256 challengeId;
        uint32[] conditions;
        uint32[] values;
        address athleteAddress;
    }

    constructor(address challengManagerAdr, address apiAdr) {
        manager = ChallengeManager(challengManagerAdr);
        manager.setChallenger(address(this));
        setApiAddress(apiAdr);
    }

    modifier onlyApi() {
        require(
            msg.sender == apiAddress || msg.sender == owner(),
            "Challenger: you are not allowed to submit"
        );
        _;
    }

    event PrizeReceived(address winner);

    function setApiAddress(address adr) public {
        apiAddress = adr;
    }

    function getApiAddress() external view returns (address) {
        return apiAddress;
    }

    function submitData(
        ChallengeData memory challengeData
    ) external payable onlyApi {
        require(
            challengeData.values.length == challengeData.conditions.length,
            "Challenger: argument array lengths not matching"
        );
        require(
            manager.getEndOfChallenge(challengeData.challengeId) > block.timestamp,
            "Challenger: challenge already over"
        );
        require(
            manager.getStartOfChallenge(challengeData.challengeId) < block.timestamp,
            "Challenger: challenge not started yet"
        );


        bool withUnlock = false;
        uint256 keyPrice = 0;
        if (!manager.hasUnlockedChallenge(challengeData.challengeId, challengeData.athleteAddress)) {
            require(
                manager.getCurrentParticipants(challengeData.challengeId) <
                    manager.getMaxParticipants(challengeData.challengeId),
                "Challenger: challenge is already full"
            );

            require(
                msg.value >= manager.getSubmissionFee(challengeData.challengeId),
                "Challenger: entered fee too low"
            );

            keyPrice = manager.getKeyPrice(challengeData.challengeId);
            manager.sendGymnasiaFee{value: msg.value - keyPrice}();

            withUnlock = true;
        } else {
            require(manager.multiSubmitAllowed(challengeData.challengeId), "Challenger: you are only allowed to submit once");
            manager.sendGymnasiaFee{value: msg.value}();
        }

        manager.addLeaderboardEntry{value: keyPrice}(
            challengeData.challengeId,
            challengeData.athleteAddress,
            challengeData.conditions,
            challengeData.values,
            withUnlock
        );
    }

    function submitDataMulti(
        ChallengeData[] memory challengeData
    ) external payable onlyApi {
        bool withUnlock = false;
        uint256 keyPrice = 0;
        uint256 totalPrice = 0;

        // check if msg.value is enough to pay all possible submits
        for (uint256 i = 0; i < challengeData.length; i++) {
            if (!manager.hasUnlockedChallenge(challengeData[i].challengeId, challengeData[i].athleteAddress)) {
                totalPrice += manager.getSubmissionFee(challengeData[i].challengeId);
            }
        }

        require(msg.value >= totalPrice, "Challenger: msg.value is to low");

        totalPrice = 0;

        for (uint256 i = 0; i < challengeData.length; i++) {
            require(challengeData[i].athleteAddress != address(0),
                "Challenger: 0 address");

            require(
                challengeData[i].values.length == challengeData[i].conditions.length,
                "Challenger: argument array lengths not matching"
            );
            require(
                manager.getEndOfChallenge(challengeData[i].challengeId) > block.timestamp,
                "Challenger: challenge already over"
            );
            require(
                manager.getStartOfChallenge(challengeData[i].challengeId) < block.timestamp,
                "Challenger: challenge not started yet"
            );

            withUnlock = false;
            keyPrice = 0;

            if (!manager.hasUnlockedChallenge(challengeData[i].challengeId, challengeData[i].athleteAddress)) {
                if(
                    manager.getCurrentParticipants(challengeData[i].challengeId) >= manager.getMaxParticipants(challengeData[i].challengeId) ||
                    msg.value < manager.getSubmissionFee(challengeData[i].challengeId)
                ) continue;

                require(
                    manager.getCurrentParticipants(challengeData[i].challengeId) <
                        manager.getMaxParticipants(challengeData[i].challengeId),
                    "Challenger: challenge is already full"
                );

                require(
                    msg.value >= manager.getSubmissionFee(challengeData[i].challengeId),
                    "Challenger: entered fee too low"
                );

                keyPrice = manager.getKeyPrice(challengeData[i].challengeId);
                totalPrice += keyPrice;
                withUnlock = true;
            } else {
                require(manager.multiSubmitAllowed(challengeData[i].challengeId), "Challenger: you are only allowed to submit once");
            }

            manager.addLeaderboardEntry{value: keyPrice}(
                challengeData[i].challengeId,
                challengeData[i].athleteAddress,
                challengeData[i].conditions,
                challengeData[i].values,
                withUnlock
            );
        }
        manager.sendGymnasiaFee{value: msg.value - totalPrice}();
    }

    function receivePrize(uint256 challengeId) external {
        address winner = manager.getWinner(challengeId);
        require(
            msg.sender == winner || msg.sender == apiAddress,
            "Challenger: Sorry you are not the winner"
        );

        manager.withdraw(challengeId, winner);

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
