const bookRepository = require('../repositories/BookRepository');

class BookService {

    async getAllBooks() {
        return await bookRepository.findAll();
    }

    async getBookById(id) {
        return await bookRepository.findById(id);
    }

    async addBook(data) {
        return await bookRepository.create(data);
    }

    async updateBook(id, data) {
        return await bookRepository.update(id, data);
    }

    async deleteBook(id) {
        return await bookRepository.delete(id);
    }

    async borrowBook(bookId, memberId) {
        const book = await bookRepository.findById(bookId);
        if (!book) throw new Error("Book not found");
        if (book.quantity <= 0) throw new Error("Book not available");

        const loanDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);

        await bookRepository.createLoan({
            loanDate,
            dueDate,
            memberId,
            bookId
        });

        await bookRepository.updateQuantity(bookId, book.quantity - 1);

        return "Book borrowed successfully";
    }
}

module.exports = new BookService();
