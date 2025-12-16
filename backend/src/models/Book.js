class Book {
    constructor(id, isbn, title, author, publicationYear, status, categoryId, publisherId) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.status = status; // 'available', 'loaned', 'reserved'
        this.categoryId = categoryId;
        this.publisherId = publisherId;
    }
}

module.exports = Book;