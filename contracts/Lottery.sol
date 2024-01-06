// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address[] public participants;

    constructor() {
        manager = msg.sender;
    }

    function enterLottery() public payable {
        require(msg.value > 0.01 ether, "Minimum entry fee is 0.01 ether");
        participants.push(msg.sender);
    }

    function pickWinner() public restricted {
        require(participants.length > 0, "No participants in the lottery");
        uint index = random() % participants.length;
        payable(participants[index]).transfer(address(this).balance);
        participants = new address[](0);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)));
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }
}
