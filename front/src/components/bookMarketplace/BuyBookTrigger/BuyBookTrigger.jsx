import { Button } from "@mui/material";

import useModal from "/src/hooks/useModal";

import BuyBookModal from "../BuyBookModal/BuyBookModal";

const BuyBookTrigger = ({ book }) => {
  const { handleOpenModal, openModal, handleCloseModal } = useModal();

  return (
    <>
      <Button onClick={handleOpenModal} variant="contained" color="secondary">
        Buy book
      </Button>
      <BuyBookModal
        book={book}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
export default BuyBookTrigger;
