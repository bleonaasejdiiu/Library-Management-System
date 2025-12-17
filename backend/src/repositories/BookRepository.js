const db = require('../config/db');

class BookRepository {
    async findAll() {
        const sql = `
            SELECT b.*, c.categoryName, p.name as publisherName
            FROM Book b
            LEFT JOIN Category c ON b.categoryId = c.categoryId
            LEFT JOIN Publisher p ON b.publisherId = p.publisherId
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    async create(book) {
        // Këtu po fusim ID-të që na vijnë nga Service
        const sql = `
            INSERT INTO Book (isbn, title, author, publicationYear, status, publisherId, categoryId)
            VALUES (?, ?, ?, ?, 'available', ?, ?)
        `;
        const [result] = await db.execute(sql, [
            book.isbn,
            book.title,
            book.author,
            book.publicationYear,
            book.publisherId, 
            book.categoryId
        ]);
        return result.insertId;
    }

    async delete(id) {
        await db.execute('DELETE FROM Book WHERE bookId = ?', [id]);
    }

    // --- KËTO JANË KRITIKE ---
    async findCategoryByName(name) {
        // Kontrollo te DB nëse kolona quhet 'categoryName'
        const [rows] = await db.execute('SELECT * FROM Category WHERE categoryName = ?', [name]);
        return rows[0];
    }
    
    async createCategory(name) {
        const [result] = await db.execute('INSERT INTO Category (categoryName) VALUES (?)', [name]);
        return result.insertId;
    }

    async findPublisherByName(name) {
        // Kontrollo te DB nëse kolona quhet 'name' te tabela Publisher
        const [rows] = await db.execute('SELECT * FROM Publisher WHERE name = ?', [name]);
        return rows[0];
    }

    async createPublisher(name) {
        const [result] = await db.execute('INSERT INTO Publisher (name) VALUES (?)', [name]);
        return result.insertId;
    }
    // ... funksionet e tjera ...

    async update(id, book) {
        const sql = `
            UPDATE Book 
            SET isbn=?, title=?, author=?, publicationYear=?, categoryId=?, publisherId=?
            WHERE bookId = ?
        `;
        await db.execute(sql, [
            book.isbn,
            book.title,
            book.author,
            book.publicationYear,
            book.categoryId,
            book.publisherId,
            id
        ]);
    }
}

module.exports = new BookRepository();
