const bookRepository = require('../repositories/BookRepository');

class BookService {
    async getAllBooks() {
        return await bookRepository.findAll();
    }

    async addBook(data) {
        if(!data.category) throw new Error("Kategoria është e detyrueshme");
        let categoryId;
        const existingCat = await bookRepository.findCategoryByName(data.category);
        if (existingCat) categoryId = existingCat.categoryId;
        else categoryId = await bookRepository.createCategory(data.category);

        if(!data.publisher) throw new Error("Publisher është i detyrueshëm");
        let publisherId;
        const existingPub = await bookRepository.findPublisherByName(data.publisher);
        if (existingPub) publisherId = existingPub.publisherId;
        else publisherId = await bookRepository.createPublisher(data.publisher);

        const bookToSave = {
            isbn: data.isbn,
            title: data.title,
            author: data.author,
            publicationYear: data.publicationYear,
            quantity: data.quantity, // <--- Sasia
            categoryId: categoryId,
            publisherId: publisherId
        };

        return await bookRepository.create(bookToSave);
    }

    async updateBook(id, data) {
        if(!data.category) throw new Error("Kategoria është e detyrueshme");
        let categoryId;
        const existingCat = await bookRepository.findCategoryByName(data.category);
        if (existingCat) categoryId = existingCat.categoryId;
        else categoryId = await bookRepository.createCategory(data.category);

        if(!data.publisher) throw new Error("Publisher është i detyrueshëm");
        let publisherId;
        const existingPub = await bookRepository.findPublisherByName(data.publisher);
        if (existingPub) publisherId = existingPub.publisherId;
        else publisherId = await bookRepository.createPublisher(data.publisher);

        const bookToUpdate = {
            isbn: data.isbn,
            title: data.title,
            author: data.author,
            publicationYear: data.publicationYear,
            quantity: data.quantity, // <--- Sasia
            categoryId: categoryId,
            publisherId: publisherId
        };

        return await bookRepository.update(id, bookToUpdate);
    }

    async deleteBook(id) {
        return await bookRepository.delete(id);
    }
    // FUNKSIONI GET BOOK BY ID
async getBookById(id) {
    return await bookRepository.findById(id);
}

// FUNKSIONI BORROW BOOK
async borrowBook(bookId, memberId) {
    const book = await bookRepository.findById(bookId);
    if (!book) throw new Error("Book not found");
    if (book.quantity <= 0) throw new Error("Book not available");

    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // afat 14 ditë

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