import React from "react";
import { Box } from "@mui/material";

import AddBookTrigger from "../AddBookTrigger/AddBookTrigger";
import AllBooks from "../AllBooks/AllBooks";

import Loading from "/src/components/Loading/Loading";
import { ERROR_MESSAGES } from "/src/components/constants/notificationMessage";
import BookMarketplaceService from "/src/services/BookMarketplaceService";
import { BlockchainContext } from "/src/context/BlockchainContext";
import useCustomStyles from "/src/hooks/useCustomStyles";

const BookMarketplace = () => {
  const [books, setBooks] = React.useState([]);
  const { theme } = useCustomStyles();
  const { setNotificationMessage, currentConnection, loading, setLoading } =
    React.useContext(BlockchainContext);

  const bookMarketplace = currentConnection?.bookMarketplace;
  const signer = currentConnection?.signer;

  const isConnectionInvalid = !signer || !bookMarketplace;
  const isBooksExist = books?.length > 0;

  const bookService = React.useMemo(
    () => new BookMarketplaceService(bookMarketplace, setNotificationMessage),
    [bookMarketplace, setNotificationMessage]
  );

  const fetchBooks = React.useCallback(async () => {
    try {
      setLoading(true);

      const contractBooks = await bookService.getContractBooks();
      const firestoreBooks = await bookService.getFireBaseBooks();

      const booksArray = bookService.mergeBooks(contractBooks, firestoreBooks);
      setBooks(booksArray);
    } catch {
      setNotificationMessage(ERROR_MESSAGES.FAILED_FETCHING_BOOKS);
    } finally {
      setLoading(false);
    }
  }, [bookService, setLoading, setNotificationMessage]);

  React.useEffect(() => {
    if (!isConnectionInvalid) fetchBooks();
  }, [isConnectionInvalid, fetchBooks]);

  React.useEffect(() => {
    if (isConnectionInvalid) return;

    const handleBookAdded = async () => await fetchBooks();
    const handleBookPurchased = async () => await fetchBooks();

    bookMarketplace.on("BookAdded", handleBookAdded);
    bookMarketplace.on("BookPurchased", handleBookPurchased);

    return () => {
      bookMarketplace.off("BookAdded", handleBookAdded);
      bookMarketplace.off("BookPurchased", handleBookPurchased);
    };
  }, [isConnectionInvalid, bookMarketplace, fetchBooks]);

  if (loading) return <Loading />;

  return (
    <Box sx={theme.generalContainer}>
      <AddBookTrigger />
      {isBooksExist && <AllBooks books={books} />}
    </Box>
  );
};

export default BookMarketplace;
