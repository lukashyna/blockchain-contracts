require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  settings: {
    evmVersion: "shanghai",
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_RPC_URL}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
