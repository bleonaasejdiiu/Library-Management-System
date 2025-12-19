const bookRepository = require('../repositories/BookRepository');

class BookService {
    async getAllBooks() { return await bookRepository.findAll(); }
    async getBookById(id) { return await bookRepository.findById(id); }

    async addBook(data) {
        let category = await bookRepository.findCategoryByName(data.category);
        let categoryId = category ? category.categoryId : await bookRepository.createCategory(data.category);
        let publisher = await bookRepository.findPublisherByName(data.publisher);
        let publisherId = publisher ? publisher.publisherId : await bookRepository.createPublisher(data.publisher);
        return await bookRepository.create({ ...data, categoryId, publisherId });
    }

    async updateBook(id, data) {
        let category = await bookRepository.findCategoryByName(data.category);
        let categoryId = category ? category.categoryId : await bookRepository.createCategory(data.category);
        let publisher = await bookRepository.findPublisherByName(data.publisher);
        let publisherId = publisher ? publisher.publisherId : await bookRepository.createPublisher(data.publisher);
        return await bookRepository.update(id, { ...data, categoryId, publisherId });
    }

    // FIXED DELETE LOGIC
    async deleteBook(id) { 
        // 1. Delete all loans linked to this book first
        await bookRepository.deleteRelatedLoans(id);
        
        // 2. Delete all reservations linked to this book
        await bookRepository.deleteRelatedReservations(id);
        
        // 3. Finally, delete the book itself
        return await bookRepository.delete(id); 
    }

    async borrowBook(bookId, memberId) {
        const book = await bookRepository.findById(bookId);
        if (!book || book.quantity <= 0) throw new Error("Libri nuk është i disponueshëm");
        const loanDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        await bookRepository.createLoan({ loanDate, dueDate, memberId, bookId });
        await bookRepository.updateQuantity(bookId, book.quantity - 1);
        return "Book borrowed successfully";
    }

    async getLoansByMember(memberId) { return await bookRepository.findLoansByMember(memberId); }

    async reserveBook(bookId, memberId) {
        if (!bookId || !memberId) throw new Error("Mungon ID e librit ose anëtarit");
        await bookRepository.createReservation({ memberId, bookId });
        return "Libri u rezervua me sukses!";
    }

    async getReservationsByMember(memberId) { return await bookRepository.findReservationsByMember(memberId); }

    async checkOverdueLoans(memberId) {
        try {
            const overdueLoans = await bookRepository.findOverdueLoans(memberId);
            for (const loan of overdueLoans) {
                const alreadyNotified = await bookRepository.checkNotificationExists(memberId, loan.title);
                if (!alreadyNotified) {
                    const message = `VONËSË: Libri "${loan.title}" duhej të kthehej me datë ${new Date(loan.dueDate).toLocaleDateString()}.`;
                    await bookRepository.addNotification(memberId, message);
                }
            }
        } catch (error) {
            console.error("Njoftimi dështoi por procesi vazhdon:", error);
        }
    }
}

module.exports = new BookService();