import React from "react";
import { Button, Typography } from "@mui/material";

import { BlockchainContext } from "/src/context/BlockchainContext";

const ConnectWallet = () => {
  const { connectWallet } = React.useContext(BlockchainContext);

  return (
    <>
      <Typography variant="h1" color="primary" mb={3}>
        Please connect your account...
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={connectWallet}
        fullWidth
      >
        Connect wallet
      </Button>
    </>
  );
};

export default ConnectWallet;
