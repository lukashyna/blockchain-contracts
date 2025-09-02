export const SUCCESS_MESSAGES = {
  ADDED_BOOK: {
    message: "The book has been successfully added.",
    type: "success",
  },
  FILE_UPLOADED: {
    message: "The file has been successfully uploaded.",
    type: "success",
  },
  PURCHASE_SUCCESSFUL: {
    message: "Purchase successful.",
    type: "success",
  },
  VOTING_SUCCESSFUL: {
    message: "Your vote has been successfully recorded!",
    type: "success",
  },
};

export const ERROR_MESSAGES = {
  INVALID_BOOK_DATA: {
    message: "Fill in all the fields.",
    type: "error",
  },
  INVALID_QUANTITY: {
    message: "Invalid quantity",
    type: "error",
  },
  FILE_NOT_UPLOADED: {
    message: "File upload failed.",
    type: "error",
  },
  FAILED_ADDED_BOOK: {
    message: "An error occurred while adding book.",
    type: "error",
  },
  FAILED_FETCHING_BOOKS: {
    message: "Error when fetching books.",
    type: "error",
  },
  FAILED_REMOVE_BOOK: {
    message: "Failed to update or remove the book from the database.",
    type: "error",
  },
  FAILED_BOUGHT_BOOK: {
    message: "The purchase of the book failed.",
    type: "error",
  },
  FAILED_FETCHING_VOTES: {
    message: "An error occurred while fetching votes.",
    type: "error",
  },
  FAILED_VOTING: {
    message: "An error occurred while voting.",
    type: "error",
  },
  METAMASK_NOT_INSTALLED: {
    message: "Please install Metamask!",
    type: "error",
  },
  SIGNER_NOT_FOUND: {
    message: "Signer not found",
    type: "error",
  },
  WRONG_NETWORK: {
    message: "Please connect to Sepolia",
    type: "error",
  },
};
