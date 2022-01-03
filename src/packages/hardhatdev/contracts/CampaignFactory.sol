// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract CampaignFactory {
    address[] private deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint8 approvalCount;
        mapping(address => bool) approvals;
    }

    uint8 private numRequests;
    mapping(uint256 => Request) public requests;
    mapping(address => bool) public approvers;
    uint8 public approversCount;

    address public manager;
    uint256 private minimumContribution;

    constructor(uint256 minimum, address creater) {
        manager = creater;
        minimumContribution = minimum;
    }

    function getMinimumContribution() public view returns (uint256) {
        return minimumContribution;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) public restricted {
        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function approverRequest(uint256 index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!requests[index].complete);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint8,
            uint8,
            address
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint8) {
        return numRequests;
    }

    modifier isApprover() {
        require(approvers[msg.sender]);
        _;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
