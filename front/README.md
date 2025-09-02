# Frontend Setup and Usage

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Vite](https://vitejs.dev/)

## Available Commands

### Start development server

Runs the project in development mode:

```sh
npm run dev
```

### Build the project

Generates a production-ready build:

```sh
npm run build
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

### Network Configuration

- `VITE_APP_NETWORK_ID=0x539` (for localhost)
- `VITE_APP_NETWORK_ID=0xaa36a7` (for Sepolia testnet)

### Smart Contract Addresses

- `VITE_APP_VOTING_ADDRESS=<your-voting-contract-address>`
- `VITE_APP_BOOKSTORE_ADDRESS=<your-bookstore-contract-address>`

### Pinata API Keys (for IPFS storage)

- `VITE_APP_PINATA_API_KEY=<your-pinata-api-key>`
- `VITE_APP_PINATA_SECRET_KEY=<your-pinata-secret-key>`

Ensure these environment variables are set up correctly before running the project.
