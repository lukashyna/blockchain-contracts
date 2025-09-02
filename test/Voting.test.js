import { loadFixture, ethers, expect } from "./setup.js";

describe("Voting Contract", function () {
  async function deployVotingFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const proposalNames = ["Proposal 1", "Proposal 2", "Proposal 3"];
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(proposalNames, 3000);

    await voting.waitForDeployment();

    return { voting, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should deploy with correct proposals", async function () {
      const { voting } = await loadFixture(deployVotingFixture);

      const proposals = await voting.getProposals();
      expect(proposals.length).to.equal(3);
      expect(proposals[0].description).to.equal("Proposal 1");
      expect(proposals[1].description).to.equal("Proposal 2");
      expect(proposals[2].description).to.equal("Proposal 3");
    });

    it("Should set the correct owner", async function () {
      const { voting, owner } = await loadFixture(deployVotingFixture);

      expect(await voting.owner()).to.equal(owner.address);
    });
  });

  describe("Voting functionality", function () {
    it("Should allow users to vote", async function () {
      const { voting, addr1 } = await loadFixture(deployVotingFixture);

      await voting.connect(addr1).vote(0);

      const proposals = await voting.getProposals();
      expect(proposals[0].voteCount).to.equal(1);
    });

    it("Should not allow the same user to vote twice", async function () {
      const { voting, addr1 } = await loadFixture(deployVotingFixture);

      await voting.connect(addr1).vote(0);

      await expect(voting.connect(addr1).vote(0)).to.be.revertedWith(
        "You have already voted."
      );
    });

    it("Should revert if the proposal index is invalid", async function () {
      const { voting, addr1 } = await loadFixture(deployVotingFixture);

      await expect(voting.connect(addr1).vote(99)).to.be.revertedWith(
        "Invalid proposal index."
      );
    });

    it("Should correctly track the vote count", async function () {
      const { voting, addr1, addr2 } = await loadFixture(deployVotingFixture);

      await voting.connect(addr1).vote(0);
      await voting.connect(addr2).vote(1);

      const proposals = await voting.getProposals();
      expect(proposals[0].voteCount).to.equal(1);
      expect(proposals[1].voteCount).to.equal(1);
    });
    it("Should return false if voting time has not ended yet", async function () {
      const { voting } = await loadFixture(deployVotingFixture);

      expect(await voting.hasVotingEnded()).to.be.false;
    });
    it("Should return true if voting has ended", async function () {
      const { voting } = await loadFixture(deployVotingFixture);

      const duration = 3000;

      await ethers.provider.send("evm_increaseTime", [duration + 1]);
      await ethers.provider.send("evm_mine");

      expect(await voting.hasVotingEnded()).to.be.true;
    });
  });
});
