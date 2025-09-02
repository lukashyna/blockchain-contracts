// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Voting {
    struct Proposal {
        string description;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    Proposal[] public proposals;

    address public owner;
    uint public startTime;
    uint public duration;

    modifier votingActive() {
        require(block.timestamp <= startTime + duration, "Voting has ended.");
        _;
    }

    constructor(string[] memory proposalNames, uint _duration) {
        owner = msg.sender;
        duration = _duration;
        startTime = block.timestamp;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(
                Proposal({description: proposalNames[i], voteCount: 0})
            );
        }
    }

    function vote(uint proposalIndex) public votingActive {
        require(!voters[msg.sender], "You have already voted.");
        require(proposalIndex < proposals.length, "Invalid proposal index.");

        voters[msg.sender] = true;
        proposals[proposalIndex].voteCount += 1;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function hasVotingEnded() public view returns (bool) {
        return block.timestamp > startTime + duration;
    }
}
