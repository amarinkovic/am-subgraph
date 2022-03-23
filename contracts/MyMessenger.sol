// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract MyMessenger {
    
    uint256 counter;

    event MyMessage(uint256 messageId, string message);

    constructor() {
        counter = 0;
    }

    function send(string calldata myMessage) external {
        uint256 messageId = counter++ + 1;
        emit MyMessage(messageId, myMessage);
    }

    function getCounter() external view returns (uint256) {
        return counter;
    }
}