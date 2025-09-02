import React from "react";

const useModal = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return { openModal, handleOpenModal, handleCloseModal };
};

export default useModal;
