import React from "react";
import { Typography, Stack, TextField, Button, InputBase } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { v4 as uuidv4 } from "uuid";

import { defaultBook, bookFields, IPFS_URL } from "./constants";
import { uuidToUint256 } from "./helpers";

import ModalContainer from "/src/components/ModalContainer/ModalContainer";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from "/src/components/constants/notificationMessage";
import BookMarketplaceService from "/src/services/BookMarketplaceService";
import { BlockchainContext } from "/src/context/BlockchainContext";

const styles = { marginBottom: "10px" };

const AddBookModal = ({ openModal, handleCloseModal }) => {
  const [book, setBook] = React.useState(defaultBook);
  const [loadingFile, setLoadingFile] = React.useState(false);
  const { setNotificationMessage, currentConnection, loading, setLoading } =
    React.useContext(BlockchainContext);

  const signer = currentConnection?.signer;
  const bookMarketplace = currentConnection?.bookMarketplace;

  const isConnectionInvalid = !signer || !bookMarketplace;
  const isBookDataInvalid =
    !book.title || !book.author || !book.quantity || !book.price;
  const isButtonDisable = loadingFile || loading;

  const uploadText = loadingFile ? "Uploading cover..." : "Upload cover";
  const addBookText = loading ? "Adding..." : "Add book";

  const bookService = React.useMemo(
    () => new BookMarketplaceService(bookMarketplace, setNotificationMessage),
    [bookMarketplace, setNotificationMessage]
  );

  const handleChange = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoadingFile(true);

      const ipfsHash = await bookService.uploadFileToIPFS(formData);

      if (!ipfsHash) {
        setNotificationMessage(ERROR_MESSAGES.FILE_NOT_UPLOADED);
        return;
      }
      setBook((prev) => ({
        ...prev,
        cover: `${IPFS_URL}${ipfsHash}`,
      }));

      setNotificationMessage(SUCCESS_MESSAGES.FILE_UPLOADED);
    } catch {
      setNotificationMessage(ERROR_MESSAGES.FILE_NOT_UPLOADED);
    } finally {
      setLoadingFile(false);
    }
  };

  const handleSubmit = async () => {
    if (isConnectionInvalid) return;

    if (isBookDataInvalid)
      return setNotificationMessage(ERROR_MESSAGES.INVALID_BOOK_DATA);

    const id = uuidv4();
    const bookId = uuidToUint256(id);

    try {
      setLoading(true);

      const [firebaseSuccess, contractSuccess] = await Promise.all([
        bookService.addBookToFireBase(bookId, book),
        bookService.addBookToContract(bookId, book),
      ]);

      if (!(firebaseSuccess && contractSuccess)) {
        setNotificationMessage(ERROR_MESSAGES.FAILED_ADDED_BOOK);
        return;
      }

      setBook(defaultBook);
      handleCloseModal();
      setNotificationMessage(SUCCESS_MESSAGES.ADDED_BOOK);
    } catch {
      setNotificationMessage(ERROR_MESSAGES.FAILED_ADDED_BOOK);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ModalContainer open={openModal} handleClose={handleCloseModal}>
      <Typography variant="h1" component="h2" color="primary" style={styles}>
        Add book
      </Typography>
      <Stack spacing={2}>
        {bookFields.map((field, index) => (
          <TextField
            key={index}
            label={field.label}
            name={field.name}
            type={field.type}
            value={book[field.name]}
            multiline={field.multiline}
            rows={field.maxRows || 1}
            onChange={handleChange}
            fullWidth
          />
        ))}
        <Button
          component="label"
          variant="contained"
          disabled={isButtonDisable}
          startIcon={<CloudUploadIcon />}
        >
          {uploadText}
          <InputBase variant="hidden" type="file" onChange={handleFileChange} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isButtonDisable}
        >
          {addBookText}
        </Button>
      </Stack>
    </ModalContainer>
  );
};

export default AddBookModal;
