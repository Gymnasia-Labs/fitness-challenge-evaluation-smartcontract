// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "./ChallengeManager.sol";

contract Challenger {
    ChallengeManager internal manager;
    address internal apiAddress;

    mapping(bytes32 => uint256) public requests; // todo add data and time

    constructor(address challengManagerAdr, address apiAdr) {
        manager = ChallengeManager(challengManagerAdr);
        manager.setChallenger(address(this));
        setApiAddress(apiAdr);
    }

    modifier onlyApi() {
        require(msg.sender == apiAddress, "Challenger: you are not allowed to submit");
        _;
    }

    event PrizeReceived(address winner);

    function setApiAddress(address adr) public{
        apiAddress = adr;
    }

    function getApiAddress() external view returns(address){
        return apiAddress;
    }

    function submitData(
        uint256 challengeId,
        uint32[] calldata conditions,
        uint32[] calldata time,
        address atheletAddress
    ) external payable onlyApi {
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
        if (!manager.hasUnlockedChallenge(challengeId, atheletAddress)) {
            require(
                manager.getCurrentParticipants(challengeId) <
                    manager.getMaxParticipants(challengeId),
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
            require(manager.multiSubmitAllowed(challengeId), "Challenger: you are only allowed to submit once");
            manager.sendGymnasiaFee{value: msg.value}();
        }

        manager.addLeaderboardEntry{value: keyPrice}(
            challengeId,
            atheletAddress,
            conditions,
            time,
            withUnlock
        );
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
