import { ethers } from "ethers";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import axios from "axios";

import { db } from "../firebase";

import { ERROR_MESSAGES } from "../components/constants/notificationMessage";

const PINATA_API_KEY = import.meta.env.VITE_APP_PINATA_API_KEY;
const PINATA_SECRET_KEY = import.meta.env.VITE_APP_PINATA_SECRET_KEY;
const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

class BookMarketplaceService {
  constructor(contractInstance, setNotificationMessage) {
    this.contract = contractInstance;
    this.setNotificationMessage = setNotificationMessage;
  }

  async getContractBooks() {
    try {
      const booksData = await this.contract.getAllBooks();
      const filteredBooks =
        booksData?.filter((book) => book.quantity > 0) || [];

      return filteredBooks;
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason,
        type: "error",
      });
    }
  }

  async getFireBaseBooks() {
    try {
      const booksSnapshot = await getDocs(collection(db, "books"));
      const firestoreBooks = booksSnapshot.docs.map((doc) => doc.data());

      return firestoreBooks;
    } catch {
      this.setNotificationMessage(ERROR_MESSAGES.FAILED_FETCHING_BOOKS);
    }
  }

  mergeBooks(contractBooks, firestoreBooks) {
    const booksMap = new Map();

    contractBooks.forEach((book) => {
      const bookObj = {
        bookId: book.bookId.toString(),
        price: book.price,
        quantity: book.quantity,
      };

      booksMap.set(bookObj.bookId, bookObj);
    });

    firestoreBooks.forEach((book) => {
      const bookIdStr = book.bookId?.toString() || "";

      if (booksMap.has(bookIdStr)) {
        booksMap.set(bookIdStr, {
          ...booksMap.get(bookIdStr),
          ...book,
        });
      }
    });

    return Array.from(booksMap.values());
  }

  async buyBook(bookId, chosenQuantity, price, quantity) {
    try {
      const totalPrice = price * BigInt(chosenQuantity);
      const tx = await this.contract.buyBook(bookId, chosenQuantity, {
        value: totalPrice,
      });

      await tx.wait();
      await this.removeBookFromFireBase(bookId, chosenQuantity, quantity);

      return true;
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason || ERROR_MESSAGES.FAILED_BOUGHT_BOOK.message,
        type: "error",
      });
    }
  }

  async removeBookFromFireBase(bookId, chosenQuantity, quantity) {
    try {
      const remainingQuantity = quantity - BigInt(chosenQuantity);
      if (remainingQuantity !== BigInt(0)) return;

      const booksRef = collection(db, "books");
      const q = query(booksRef, where("bookId", "==", bookId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "books", docSnap.id));
      });
    } catch {
      this.setNotificationMessage(ERROR_MESSAGES.FAILED_REMOVE_BOOK);
    }
  }

  async addBookToContract(bookId, book) {
    try {
      const tx = await this.contract.addBook(
        bookId,
        ethers.parseEther(book.price),
        book.quantity
      );
      await tx.wait();

      return true;
    } catch (error) {
      this.setNotificationMessage({
        message: error.reason,
        type: "error",
      });
    }
  }

  async addBookToFireBase(bookId, book) {
    try {
      addDoc(collection(db, "books"), {
        bookId: bookId,
        title: book.title,
        author: book.author,
        cover: book.cover,
        description: book.description,
        createdAt: new Date(),
      });

      return true;
    } catch {
      this.setNotificationMessage(ERROR_MESSAGES.FAILED_ADDED_BOOK);
    }
  }

  async uploadFileToIPFS(formData) {
    try {
      const response = await axios.post(PINATA_URL, formData, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      });
      const ipfsHash = response.data.IpfsHash;

      return ipfsHash;
    } catch {
      this.setNotificationMessage(ERROR_MESSAGES.FILE_NOT_UPLOADED);
    }
  }
}

export default BookMarketplaceService;
