const db = require('../config/db');

class BookRepository {
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

    async create(book) {
        // Këtu shtuam 'quantity'
        const sql = `
            INSERT INTO book (ISBN, title, author, publicationYear, status, publisherId, categoryId, quantity)
            VALUES (?, ?, ?, ?, 'available', ?, ?, ?)
        `;
        
        const [result] = await db.execute(sql, [
            book.isbn,
            book.title,
            book.author,
            book.publicationYear,
            book.publisherId, 
            book.categoryId,
            book.quantity || 1 // Nëse s'ka sasi, vëre 1
        ]);
        return result.insertId;
    }

    async update(id, book) {
        // Edhe këtu shtuam 'quantity' te Update
        const sql = `
            UPDATE book 
            SET ISBN=?, title=?, author=?, publicationYear=?, categoryId=?, publisherId=?, quantity=?
            WHERE bookId = ?
        `;
        await db.execute(sql, [
            book.isbn,
            book.title,
            book.author,
            book.publicationYear,
            book.categoryId,
            book.publisherId,
            book.quantity || 1,
            id
        ]);
    }

    async delete(id) {
        await db.execute('DELETE FROM book WHERE bookId = ?', [id]);
    }

    // Helper methods...
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