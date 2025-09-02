import React from "react";
import { Box, Container } from "@mui/material";

import { BlockchainContext } from "../context/BlockchainContext";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Notification from "../components/Notification/Notification";
import ChooseBlockchain from "../components/ChooseBlockchain/ChooseBlockchain";
import useCustomStyles from "../hooks/useCustomStyles";

const Root = () => {
  const { currentConnection } = React.useContext(BlockchainContext);
  const { theme } = useCustomStyles();

  return (
    <Container>
      <Box component="main" sx={theme.main}>
        {!currentConnection?.signer ? <ConnectWallet /> : <ChooseBlockchain />}
        <Notification />
      </Box>
    </Container>
  );
};

export default Root;
