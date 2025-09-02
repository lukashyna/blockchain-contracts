import hardhat from "hardhat";

const { ethers, network } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(`Network: ${network.name}`);

  const BookMarketplace = await ethers.getContractFactory("BookMarketplace");
  const bookMarketplace = await BookMarketplace.deploy();
  await bookMarketplace.waitForDeployment();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
