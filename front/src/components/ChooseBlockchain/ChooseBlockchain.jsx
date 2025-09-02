import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { navigationData } from "./constants";

import { BlockchainContext } from "/src/context/BlockchainContext";
import useCustomStyles from "/src/hooks/useCustomStyles";

const styles = {
  address: { maxWidth: { xs: "100%", sm: "50%" }, alignItems: "flex-start" },
  head: { marginBottom: "6%" },
};

const ChooseBlockchain = () => {
  const { currentConnection } = React.useContext(BlockchainContext);
  const { theme } = useCustomStyles();

  return (
    <>
      <Box sx={[theme.flexRowContainer, styles.head]}>
        <Box>
          {navigationData.map((data, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              component={Link}
              to={data.path}
              sx={theme.button}
            >
              {data.label}
            </Button>
          ))}
        </Box>
        <Box sx={[theme.addressContainer, styles.address]}>
          <PersonIcon color="primary" />
          <Typography variant="h4" component="div" color="primary">
            Your address:
            {currentConnection.signer.address}
          </Typography>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default ChooseBlockchain;
