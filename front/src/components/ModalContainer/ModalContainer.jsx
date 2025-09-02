import { IconButton, Modal, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import useCustomStyles from "/src/hooks/useCustomStyles";

const ModalContainer = ({ children, open, handleClose }) => {
  const { theme } = useCustomStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={theme.modalContainer}
    >
      <Stack sx={theme.modal} spacing={1}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={theme.iconButton}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Stack>
    </Modal>
  );
};

export default ModalContainer;
