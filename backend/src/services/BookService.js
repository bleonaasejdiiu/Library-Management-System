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
}

module.exports = new BookService();