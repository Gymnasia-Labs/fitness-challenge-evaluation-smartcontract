// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

abstract contract Ownable {
    //todo add abstract after compiler upgrade
    address private _owner;
    bool private isFirstCall = true;
    bool private isFirstCallToken = true;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        _transferOwnership(msg.sender);
    }

    function owner() public view returns (address) {
        //todo add virtual
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    modifier onlyOwnerOrFirst() {
        require(
            owner() == msg.sender || isFirstCall,
            "Ownable: caller is not the owner"
        );
        isFirstCall = false;
        _;
    }

    modifier onlyOwnerOrFirstToken() {
        //todo find a better alternative
        require(
            owner() == msg.sender || isFirstCallToken,
            "Ownable: caller is not the owner"
        );
        isFirstCallToken = false;
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        //todo add virtual
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal {
        //todo add virtual
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}
