import { loadFixture, ethers, expect } from "./setup.js";

async function deployMarketplaceFixture() {
  const [owner, seller, buyer, other] = await ethers.getSigners();
  const Marketplace = await ethers.getContractFactory("BookMarketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.waitForDeployment();
  return { marketplace, owner, seller, buyer, other };
}

describe("BookMarketplace", function () {
  it("should allow adding a new book", async function () {
    const { marketplace, seller } = await loadFixture(deployMarketplaceFixture);
    const bookId = 123;

    await expect(
      marketplace.connect(seller).addBook(bookId, ethers.parseEther("1"), 5)
    )
      .to.emit(marketplace, "BookAdded")
      .withArgs(bookId, ethers.parseEther("1"), 5, seller.address);

    const books = await marketplace.getAllBooks();
    expect(books.length).to.equal(1);
    expect(books[0].bookId).to.equal(bookId);
    expect(books[0].quantity).to.equal(5);
  });

  it("should return all added books", async function () {
    const { marketplace, seller } = await loadFixture(deployMarketplaceFixture);
    await marketplace.connect(seller).addBook(123, ethers.parseEther("1"), 5);
    await marketplace.connect(seller).addBook(456, ethers.parseEther("2"), 3);

    const books = await marketplace.getAllBooks();
    expect(books.length).to.equal(2);
    expect(books[0].bookId).to.equal(123);
    expect(books[1].bookId).to.equal(456);
  });

  it("should not allow adding a book with zero quantity", async function () {
    const { marketplace, seller } = await loadFixture(deployMarketplaceFixture);
    await expect(
      marketplace.connect(seller).addBook(124, ethers.parseEther("1"), 0)
    ).to.be.revertedWith("Invalid price or quantity");
  });

  it("should not allow adding a book with zero price", async function () {
    const { marketplace, seller } = await loadFixture(deployMarketplaceFixture);
    await expect(
      marketplace.connect(seller).addBook(125, 0, 5)
    ).to.be.revertedWith("Invalid price or quantity");
  });

  it("should not allow adding a book with a duplicate ID", async function () {
    const { marketplace, seller } = await loadFixture(deployMarketplaceFixture);
    const bookId = 123;
    await marketplace
      .connect(seller)
      .addBook(bookId, ethers.parseEther("1"), 5);
    await expect(
      marketplace.connect(seller).addBook(bookId, ethers.parseEther("1"), 5)
    ).to.be.revertedWith("Book already exists");
  });

  it("should allow buying a book and transfer funds", async function () {
    const { marketplace, seller, buyer, owner } = await loadFixture(
      deployMarketplaceFixture
    );
    const bookId = 123;
    const price = ethers.parseEther("1");
    const quantity = 2;
    const totalCost = price * BigInt(quantity);
    const fee = (totalCost * BigInt(10)) / BigInt(100);
    const sellerAmount = totalCost - fee;

    await marketplace.connect(seller).addBook(bookId, price, 5);
    await expect(
      marketplace.connect(buyer).buyBook(bookId, quantity, { value: totalCost })
    )
      .to.emit(marketplace, "BookPurchased")
      .withArgs(bookId, quantity, buyer.address);
  });

  it("should not allow buying a non-existent book", async function () {
    const { marketplace, buyer } = await loadFixture(deployMarketplaceFixture);
    await expect(
      marketplace
        .connect(buyer)
        .buyBook(999, 1, { value: ethers.parseEther("1") })
    ).to.be.revertedWith("Book does not exist");
  });

  it("should not allow buying a book with insufficient payment", async function () {
    const { marketplace, seller, buyer } = await loadFixture(
      deployMarketplaceFixture
    );
    const bookId = 123;
    const price = ethers.parseEther("1");

    await marketplace.connect(seller).addBook(bookId, price, 5);
    await expect(
      marketplace
        .connect(buyer)
        .buyBook(bookId, 1, { value: ethers.parseEther("0.5") })
    ).to.be.revertedWith("Incorrect payment");
  });

  it("should remove the book when quantity reaches zero", async function () {
    const { marketplace, seller, buyer } = await loadFixture(
      deployMarketplaceFixture
    );
    const bookId = 123;
    const price = ethers.parseEther("1");

    await marketplace.connect(seller).addBook(bookId, price, 1);
    await marketplace.connect(buyer).buyBook(bookId, 1, { value: price });

    const books = await marketplace.getAllBooks();
    expect(books.length).to.equal(0);
  });
});
