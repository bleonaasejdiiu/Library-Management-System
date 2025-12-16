const bookService = require('../services/BookService');

class BookController {
    async getBooks(req, res) {
        try {
            const books = await bookService.getAllBooks();
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BookController();
