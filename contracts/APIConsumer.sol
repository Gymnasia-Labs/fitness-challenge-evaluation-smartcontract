// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    bool public isValidated;

    // add mapping to requestId and data
    // https://ethereum.stackexchange.com/questions/90643/how-to-pass-argument-to-chainlink-selector

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    string private jobLocation;

    constructor(
        string memory _jobLocation,
        address _oracle,
        bytes32 _jobId,
        uint256 _fee
    ) {
        setPublicChainlinkToken();
        /*
            example:
            oracle = 0x1006553C2856F55886c787AAC5899D2Bb6e4DcC6;
            jobId = "c64340ab822e4ec0a4c16f28e63d89f9";
            fee = 0.1 * 10**18; // (Varies by network and job)
        */

        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
        jobLocation = _jobLocation;
    }

    function setJobLocation(string memory _jobLocation) external {
        // todo require onlyOwner
        jobLocation = _jobLocation;
    }

    function setOracle(
        address _oracle,
        bytes32 _jobId,
        uint256 _fee
    ) external {
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
    }

    function requestValidation() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        request.add("get", jobLocation);
        request.add("path", "proof");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, bool _isValidated)
        public
        recordChainlinkFulfillment(_requestId)
    {
        isValidated = _isValidated;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
