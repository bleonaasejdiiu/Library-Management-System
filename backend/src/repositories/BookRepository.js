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
}

module.exports = new BookRepository();
