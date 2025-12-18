const db = require('../config/db');

class LoanRepository {
    async findAll() {
        const sql = `
            SELECT 
                l.loanId, 
                b.title AS bookTitle, 
                p.name AS userName, 
                p.lastname AS userSurname, 
                l.loanDate, 
                l.dueDate, 
                l.returnDate,
                l.memberId,  -- Shto memberId këtu
                CASE 
                    WHEN l.returnDate IS NULL THEN 'Active' 
                    ELSE 'Returned' 
                END as status
            FROM loan l
            JOIN book b ON l.bookId = b.bookId
            JOIN member m ON l.memberId = m.memberId
            JOIN person p ON m.personId = p.personId
            ORDER BY l.loanId DESC
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    async returnBook(loanId) {
        const sql = `UPDATE loan SET returnDate = NOW() WHERE loanId = ?`;
        await db.execute(sql, [loanId]);
    }
}

module.exports = new LoanRepository();
