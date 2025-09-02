// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract BookMarketplace {
    address public immutable owner;
    uint public constant FEE_PERCENT = 10;

    struct Book {
        uint bookId;
        address seller;
        uint price;
        uint quantity;
    }

    mapping(uint => Book) private books;
    mapping(uint => uint) private bookIndex;
    uint[] private bookIds;

    event BookAdded(
        uint indexed bookId,
        uint price,
        uint quantity,
        address seller
    );
    event BookPurchased(uint indexed bookId, uint quantity, address buyer);
    event BookRemoved(uint indexed bookId);

    constructor() {
        owner = msg.sender;
    }

    function addBook(uint bookId, uint price, uint quantity) external {
        require(books[bookId].seller == address(0), "Book already exists");
        require(price > 0 && quantity > 0, "Invalid price or quantity");

        books[bookId] = Book(bookId, msg.sender, price, quantity);
        bookIndex[bookId] = bookIds.length;
        bookIds.push(bookId);

        emit BookAdded(bookId, price, quantity, msg.sender);
    }

    function buyBook(uint bookId, uint amount) external payable {
        Book storage book = books[bookId];
        require(book.seller != address(0), "Book does not exist");
        require(amount > 0 && amount <= book.quantity, "Invalid quantity");

        uint totalPrice = book.price * amount;
        require(msg.value == totalPrice, "Incorrect payment");

        uint fee = (totalPrice * FEE_PERCENT) / 100;
        uint sellerAmount = totalPrice - fee;

        payable(owner).transfer(fee);
        payable(book.seller).transfer(sellerAmount);

        book.quantity -= amount;

        if (book.quantity == 0) {
            _removeBook(bookId);
        }

        emit BookPurchased(bookId, amount, msg.sender);
    }

    function _removeBook(uint bookId) internal {
        uint index = bookIndex[bookId];
        uint lastBookId = bookIds[bookIds.length - 1];

        bookIds[index] = lastBookId;
        bookIndex[lastBookId] = index;
        bookIds.pop();

        delete bookIndex[bookId];
        delete books[bookId];

        emit BookRemoved(bookId);
    }

    function getAllBooks() public view returns (Book[] memory) {
        Book[] memory allBooks = new Book[](bookIds.length);
        for (uint i = 0; i < bookIds.length; i++) {
            allBooks[i] = books[bookIds[i]];
        }
        return allBooks;
    }
}
