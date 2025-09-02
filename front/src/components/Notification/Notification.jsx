import React from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

import { BlockchainContext } from "/src/context/BlockchainContext";

const Notification = () => {
  const { notificationMessage, dismissNotification } =
    React.useContext(BlockchainContext);

  return (
    <Snackbar
      open={!!notificationMessage.message}
      autoHideDuration={6000}
      onClose={dismissNotification}
    >
      <Alert
        severity={notificationMessage.type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={dismissNotification}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        {notificationMessage.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
