// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract Marketplace {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalsCount;
        mapping(address => bool) approvals;
    }

    uint256 numRequests;
    mapping(uint256 => Request) public requests;

    address private manager;
    uint256 public minimumContribution;

    mapping(address => bool) public approvers;
    uint256 public approversCount;

    constructor(uint256 _minimum) {
        manager = msg.sender;
        minimumContribution = _minimum;
    }

    function getManager() public view returns (address) {
        return manager;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory _description,
        uint256 _value,
        address _recipient
    ) public restricted {
        require(approvers[msg.sender]);
        Request storage r = requests[numRequests++];

        r.description = _description;
        r.value = _value;
        r.recipient = _recipient;
        r.complete = false;
        r.approvalsCount = 0;
    }
}
