// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Owner {
    address private owner;
    address[] private players;
    address private winner;

    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getWinner() public view onlyOwner returns (address) {
        return winner;
    }

    function setEntry() public payable onlyNotOwner {
        require(msg.value > .01 ether, "Even value required.");
        players.push(msg.sender);
    }

    function pickWinner() public onlyOwner {
        uint256 index = generateRandom() % players.length;
        winner = players[index];
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyNotOwner() {
        require(msg.sender != owner);
        _;
    }

    function generateRandom() private view returns (uint256) {
        return (
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            )
        );
    }
}
