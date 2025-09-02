import { Button } from "@mui/material";

import useModal from "/src/hooks/useModal";
import AddBookModal from "../AddBookModal/AddBookModal";

const AddBookTrigger = () => {
  const { handleOpenModal, openModal, handleCloseModal } = useModal();

  return (
    <>
      <Button onClick={handleOpenModal} variant="contained" color="secondary">
        Add book
      </Button>
      <AddBookModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </>
  );
};

export default AddBookTrigger;
