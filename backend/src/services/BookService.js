const bookRepository = require('../repositories/BookRepository');

class BookService {
    async getAllBooks() {
        return await bookRepository.findAll();
    }
}

module.exports = new BookService();
