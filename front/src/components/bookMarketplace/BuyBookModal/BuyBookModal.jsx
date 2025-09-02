import React from "react";
import { Typography, Stack, TextField, Button, Box } from "@mui/material";
import { ethers } from "ethers";

import ModalContainer from "/src/components/ModalContainer/ModalContainer";

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "/src/components/constants/notificationMessage";
import BookMarketplaceService from "/src/services/BookMarketplaceService";
import { BlockchainContext } from "/src/context/BlockchainContext";
import useCustomStyles from "/src/hooks/useCustomStyles";

const styles = {
  width: { xs: "100%", sm: "50%" },
};

const BuyBookModal = ({ book, openModal, handleCloseModal }) => {
  const [chosenQuantity, setChosenQuantity] = React.useState(1);
  const { setNotificationMessage, currentConnection, loading, setLoading } =
    React.useContext(BlockchainContext);
  const { theme } = useCustomStyles();

  const { bookId, title, price, author, quantity, cover, description } = book;

  const bookMarketplace = currentConnection?.bookMarketplace;
  const buyBookText = loading ? "Buying..." : "Buy book";

  const bookService = React.useMemo(
    () => new BookMarketplaceService(bookMarketplace, setNotificationMessage),
    [bookMarketplace, setNotificationMessage]
  );

  const handleChange = (e) => {
    setChosenQuantity(e.target.value);
  };

  const isQuantityInvalid = quantity < chosenQuantity || chosenQuantity <= 0;

  const handleBuy = async () => {
    try {
      if (isQuantityInvalid)
        return setNotificationMessage(ERROR_MESSAGES.INVALID_QUANTITY);

      setLoading(true);

      const isSuccessful = await bookService.buyBook(
        bookId,
        chosenQuantity,
        price,
        quantity
      );

      if (isSuccessful) {
        setChosenQuantity(1);
        handleCloseModal();
        setNotificationMessage(SUCCESS_MESSAGES.PURCHASE_SUCCESSFUL);
      }
    } catch {
      setNotificationMessage(ERROR_MESSAGES.FAILED_REMOVE_BOOK);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalContainer open={openModal} handleClose={handleCloseModal}>
        <Typography variant="h1" component="h2" color="primary" gutterBottom>
          {title}
        </Typography>
        <Box sx={theme.flexRowContainer}>
          {cover && (
            <img
              src={cover}
              alt={title}
              width={150}
              height={"auto"}
              loading="lazy"
            />
          )}
          <Box sx={styles}>
            <Typography variant="h4" color="primary" mb={1}>
              Author: {author}
            </Typography>
            <Typography variant="h4" color="primary" mb={1}>
              Description: {description}
            </Typography>
            <Typography variant="h4" color="primary" mb={1}>
              Price: {ethers.formatEther(price)} ETH
            </Typography>
            <Typography variant="h4" color="primary" mb={3}>
              Available: {Number(quantity)}
            </Typography>
            <Stack spacing={2} mt={2}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={chosenQuantity}
                onChange={handleChange}
                fullWidth
                slotProps={{
                  htmlInput: { min: 1, max: quantity },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleBuy}
                disabled={loading}
              >
                {buyBookText}
              </Button>
            </Stack>
          </Box>
        </Box>
      </ModalContainer>
    </>
  );
};
export default BuyBookModal;
