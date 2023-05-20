// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestData {
    uint public data;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function writeData(uint newData) public onlyOwner {
        data = newData;
    }
}

