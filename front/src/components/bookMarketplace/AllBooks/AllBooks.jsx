import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { ethers } from "ethers";

import BuyBookTrigger from "../BuyBookTrigger/BuyBookTrigger";

const AllBooks = ({ books }) => (
  <>
    <Typography variant="h1" color="primary" mt={3}>
      Books
    </Typography>
    <List>
      {books.map((book, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${book.title} - ${book.author}`}
            secondary={`Price: ${ethers.formatEther(book.price)} ETH`}
          />
          <BuyBookTrigger book={book} />
        </ListItem>
      ))}
    </List>
  </>
);

export default AllBooks;
