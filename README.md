# Hardhat Project Setup and Usage

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Webfeed-Software-Solutions/blockchain-contracts.git
   cd blockchain-contracts
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Available Commands

### Clean the cache

Removes the compiled artifacts and cache:

```sh
npx hardhat clean
```

### Compile smart contracts

Compiles all smart contracts in the `contracts` directory:

```sh
npx hardhat compile
```

### Start a local Hardhat node

Runs a local Ethereum node for development:

```sh
npx hardhat node
```

### Deploy scripts

#### Locally:

```sh
npx hardhat run scripts/bookMarketplace.js --network localhost
npx hardhat run scripts/voting.js --network localhost
```

#### Sepolia Testnet:

Requires the following environment variables:

- `SEPOLIA_RPC_URL` - RPC URL for Sepolia network
- `PRIVATE_KEY` - Private key of the deploying account

```sh
npx hardhat run scripts/bookMarketplace.js --network sepolia
npx hardhat run scripts/voting.js --network sepolia
```

### Run tests

Executes all test cases:

```sh
npx hardhat test
```

## Local Development Workflow

1. Start a local Hardhat node:
   ```sh
   npx hardhat node
   ```
2. Deploy contracts locally:
   ```sh
   npx hardhat run scripts/bookMarketplace.js --network localhost
   npx hardhat run scripts/voting.js --network localhost
   ```
3. Retrieve deployed contract addresses and set them in the `.env` file for the frontend:
   ```sh
   VITE_APP_NETWORK_ID=0x539
   VITE_APP_VOTING_ADDRESS=<your-voting-contract-address>
   VITE_APP_BOOKSTORE_ADDRESS=<your-bookstore-contract-address>
   ```
4. Run tests:
   ```sh
   npx hardhat test
   ```

## Deploying to Other Networks

1. Set up environment variables in a `.env` file:
   ```sh
   SEPOLIA_RPC_URL=<your-sepolia-rpc-url>
   PRIVATE_KEY=<your-private-key>
   ```
2. Deploy to Sepolia:

   ```sh
   npx hardhat run scripts/bookMarketplace.js --network sepolia
   npx hardhat run scripts/voting.js --network sepolia
   ```

3. Verify deployment on Sepolia Etherscan:
   - Go to [Sepolia Etherscan](https://sepolia.etherscan.io/) and search for your contract address to check its status and transactions.

Ensure your wallet has enough test ETH when deploying to testnets.
