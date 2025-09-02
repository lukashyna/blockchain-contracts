import hardhat from "hardhat";

const { ethers, network } = hardhat;

const proposalNames = [
  "Technology & AI – AI and innovation rule the world.",
  "Geopolitics – Global powers compete for dominance.",
  "Finance – Cryptos and digital money take over",
  "Robot Rule – Machines conquer us, Bitcoin tax incoming.",
];
const duration = 31_536_000;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(`Network: ${network.name}`);

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(proposalNames, duration);
  await voting.waitForDeployment();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
