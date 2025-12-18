const bookService = require('../services/BookService');

class BookController {
    async getBooks(req, res) {
        try {
            const books = await bookService.getAllBooks();
            res.json(books);
        } catch (error) {
            console.error("GET Error:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async addBook(req, res) {
        try {
            console.log("📥 Duke shtuar librin:", req.body); // Kjo del në terminal
            const newBookId = await bookService.addBook(req.body);
            res.status(201).json({ message: 'Libri u shtua!', id: newBookId });
        } catch (error) {
            console.error("❌ POST Error:", error); // Kjo është më e rëndësishmja
            res.status(500).json({ error: error.message });
        }
    }

    async deleteBook(req, res) {
        try {
            const { id } = req.params;
            await bookService.deleteBook(id);
            res.json({ message: 'Libri u fshi' });
        } catch (error) {
            console.error("DELETE Error:", error);
            res.status(500).json({ error: error.message });
        }
    }
    // ... funksionet e tjera ...

    async updateBook(req, res) {
        try {
            const { id } = req.params;
            await bookService.updateBook(id, req.body);
            res.json({ message: 'Libri u përditësua me sukses!' });
        } catch (error) {
            console.error("UPDATE Error:", error);
            res.status(500).json({ error: error.message });
        }
    }
    // MERR DETAJET E NJË LIBRI
    async getBookById(req, res) {
        try {
            const { id } = req.params;
            const book = await bookService.getBookById(id);
            if (!book) return res.status(404).json({ message: 'Book not found' });
            res.json(book);
        } catch (error) {
            console.error("GET BY ID Error:", error);
            res.status(500).json({ error: error.message });
        }
    }

    // HUAZIMI I NJË LIBRI
    async borrowBook(req, res) {
        try {
            const { id } = req.params; // bookId
            const { memberId } = req.body; // nga frontend

            const result = await bookService.borrowBook(id, memberId);
            res.json({ message: result });
        } catch (error) {
            console.error("BORROW Error:", error);
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new BookController();