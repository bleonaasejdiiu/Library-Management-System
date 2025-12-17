const bookRepository = require('../repositories/BookRepository');

class BookService {
    async getAllBooks() {
        return await bookRepository.findAll();
    }

    async addBook(data) {
        // 1. KATEGORIA
        let categoryId;
        // Nëse vjen bosh, mos e lër të kalojë
        if(!data.category) throw new Error("Kategoria është e detyrueshme");

        const existingCat = await bookRepository.findCategoryByName(data.category);
        if (existingCat) {
            categoryId = existingCat.categoryId;
        } else {
            categoryId = await bookRepository.createCategory(data.category);
        }

        // 2. PUBLISHER
        let publisherId;
        // Nëse vjen bosh
        if(!data.publisher) throw new Error("Publisher është i detyrueshëm");

        const existingPub = await bookRepository.findPublisherByName(data.publisher);
        if (existingPub) {
            publisherId = existingPub.publisherId;
        } else {
            publisherId = await bookRepository.createPublisher(data.publisher);
        }

        // 3. RUAJ LIBRIN ME ID
        const bookToSave = {
            isbn: data.isbn,
            title: data.title,
            author: data.author,
            publicationYear: data.publicationYear,
            categoryId: categoryId, // Numër
            publisherId: publisherId // Numër
        };

        return await bookRepository.create(bookToSave);
    }

    async deleteBook(id) {
        return await bookRepository.delete(id);
    }
}

module.exports = new BookService();