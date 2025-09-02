export const defaultBook = {
  title: "",
  author: "",
  quantity: "",
  price: "",
  cover: "",
};

export const bookFields = [
  { name: "title", label: "Title", type: "text", multiline: false },
  { name: "author", label: "Author", type: "text", multiline: false },
  { name: "quantity", label: "Quantity", type: "number", multiline: false },
  { name: "price", label: "Price (ETH)", type: "number", multiline: false },
  {
    name: "description",
    label: "Description",
    type: "text",
    multiline: true,
    maxRows: 4,
  },
];

export const IPFS_URL = "https://ipfs.io/ipfs/";
