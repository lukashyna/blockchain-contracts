class VotingService {
  constructor(contractInstance, setNotificationMessage) {
    this.contract = contractInstance;
    this.setNotificationMessage = setNotificationMessage;
  }

  async getProposals() {
    try {
      return await this.contract.getProposals();
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason,
        type: "error",
      });
    }
  }

  async hasVotingEnded() {
    try {
      return await this.contract.hasVotingEnded();
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason,
        type: "error",
      });
    }
  }

  async getStartTime() {
    try {
      return await this.contract.startTime();
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason,
        type: "error",
      });
    }
  }

  async getDuration() {
    try {
      return await this.contract.duration();
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason,
        type: "error",
      });
    }
  }

  async hasUserVoted(signer) {
    try {
      return await this.contract.voters(signer);
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason,
        type: "error",
      });
    }
  }

  async submitVote(voteIndex) {
    try {
      const tx = await this.contract.vote(voteIndex);
      await tx.wait();

      return true;
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason,
        type: "error",
      });
    }
  }
}

export default VotingService;
