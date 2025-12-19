const db = require('../config/db');

class BookRepository {
    // --- NEW CLEANUP METHODS ---
    async deleteRelatedLoans(bookId) {
        await db.execute('DELETE FROM loan WHERE bookId = ?', [bookId]);
    }

    async deleteRelatedReservations(bookId) {
        await db.execute('DELETE FROM reservation WHERE bookId = ?', [bookId]);
    }

    // --- EXISTING METHODS ---
    async findAll() {
        const sql = `
            SELECT b.*, c.categoryName, p.name as publisherName
            FROM book b
            LEFT JOIN category c ON b.categoryId = c.categoryId
            LEFT JOIN publisher p ON b.publisherId = p.publisherId
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    async findById(id) {
        const sql = `
            SELECT b.bookId AS id, b.ISBN AS isbn, b.title, b.author, 
                   b.publicationYear, b.quantity, b.status, c.categoryName, p.name AS publisherName
            FROM book b
            LEFT JOIN category c ON b.categoryId = c.categoryId
            LEFT JOIN publisher p ON b.publisherId = p.publisherId
            WHERE b.bookId = ?
        `;
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    async create(book) {
        const sql = `
            INSERT INTO book (ISBN, title, author, publicationYear, status, publisherId, categoryId, quantity)
            VALUES (?, ?, ?, ?, 'available', ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [
            book.isbn || null,
            book.title || null,
            book.author || null,
            book.publicationYear || null,
            book.publisherId || null, 
            book.categoryId || null,
            book.quantity || 1
        ]);
        return result.insertId;
    }

    async update(id, book) {
        const sql = `
            UPDATE book 
            SET ISBN=?, title=?, author=?, publicationYear=?, categoryId=?, publisherId=?, quantity=?
            WHERE bookId = ?
        `;
        await db.execute(sql, [
            book.isbn || null,
            book.title || null,
            book.author || null,
            book.publicationYear || null,
            book.categoryId || null,
            book.publisherId || null,
            book.quantity || 1,
            id
        ]);
    }

    async delete(id) {
        await db.execute('DELETE FROM book WHERE bookId = ?', [id]);
    }

    async updateQuantity(bookId, quantity) {
        const sql = `UPDATE book SET quantity = ? WHERE bookid = ?`;
        await db.execute(sql, [quantity, bookId]);
    }

    async createLoan({ loanDate, dueDate, memberId, bookId }) {
        const sql = `INSERT INTO loan (loanDate, dueDate, memberId, bookId) VALUES (?, ?, ?, ?)`;
        await db.execute(sql, [
            loanDate || new Date(), 
            dueDate || new Date(), 
            memberId, 
            bookId
        ]);
    }

    async findLoansByMember(memberId) {
        const sql = `
            SELECT l.*, b.title, b.author 
            FROM loan l 
            JOIN book b ON l.bookId = b.bookid 
            WHERE l.memberId = ?
        `;
        const [rows] = await db.execute(sql, [memberId]);
        return rows;
    }

    async findOverdueLoans(memberId) {
        const sql = `
            SELECT l.*, b.title 
            FROM loan l
            JOIN book b ON l.bookId = b.bookid
            WHERE l.memberId = ? AND l.dueDate < NOW()
        `;
        const [rows] = await db.execute(sql, [memberId]);
        return rows;
    }

    async createReservation({ memberId, bookId }) {
        const sql = `INSERT INTO reservation (memberId, bookId, status) VALUES (?, ?, 'pending')`;
        await db.execute(sql, [memberId, bookId]);
    }

    async findReservationsByMember(memberId) {
        const sql = `
            SELECT r.*, b.title, b.author 
            FROM reservation r 
            JOIN book b ON r.bookId = b.bookid 
            WHERE r.memberId = ?
        `;
        const [rows] = await db.execute(sql, [memberId]);
        return rows;
    }

    async checkNotificationExists(memberId, messagePart) {
        const sql = "SELECT * FROM notification WHERE memberId = ? AND message LIKE ?";
        const [rows] = await db.execute(sql, [memberId, `%${messagePart}%`]);
        return rows.length > 0;
    }

    async addNotification(memberId, message) {
        const sql = "INSERT INTO notification (memberId, message) VALUES (?, ?)";
        await db.execute(sql, [memberId, message]);
    }

    async findCategoryByName(name) {
        const [rows] = await db.execute('SELECT * FROM category WHERE categoryName = ?', [name]);
        return rows[0];
    }
    
    async createCategory(name) {
        const [result] = await db.execute('INSERT INTO category (categoryName) VALUES (?)', [name]);
        return result.insertId;
    }

    async findPublisherByName(name) {
        const [rows] = await db.execute('SELECT * FROM publisher WHERE name = ?', [name]);
        return rows[0];
    }

    async createPublisher(name) {
        const [result] = await db.execute('INSERT INTO publisher (name) VALUES (?)', [name]);
        return result.insertId;
    }
}

module.exports = new BookRepository();