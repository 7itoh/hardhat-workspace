// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        initialDeployMessage(_greeting);
        greeting = _greeting;
    }

    function initialDeployMessage(string memory _greeting)
        private
        pure
        returns (string memory)
    {
        return _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        // console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
