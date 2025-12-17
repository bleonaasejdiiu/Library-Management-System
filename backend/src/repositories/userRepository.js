const db = require('../config/db');

class UserRepository {
    
    // 1. LOGIN: Gjej userin te tabela person (PA rolin)
    async findByEmail(email) {
        // Këtu ishte gabimi: Më parë kërkonte role, tani kërkojmë vetëm * nga person
        const [rows] = await db.execute('SELECT * FROM person WHERE email = ?', [email]);
        return rows[0];
    }

    // 2. GET ROLE: Këtu e marrim rolin nga tabela LIBRARIAN
    async getRole(email) {
        const sql = `
            SELECT l.role 
            FROM person p
            JOIN librarian l ON p.personId = l.personId
            WHERE p.email = ?
        `;
        const [rows] = await db.execute(sql, [email]);
        
        // Kthen 'Admin' ose 'Staff' nëse gjendet, përndryshe null (Member)
        return rows[0] ? rows[0].role : null;
    }

    // 3. REGJISTRIM
    async create(user) {
        const sql = `
            INSERT INTO person (name, surname, email, password) 
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [
            user.name, 
            user.surname, 
            user.email, 
            user.password
        ]);
        return result.insertId;
    }

    // 4. LISTA E USERAVE (Për Admin Dashboard)
    async findAll() {
        const sql = `
            SELECT p.*, l.role 
            FROM person p
            LEFT JOIN librarian l ON p.personId = l.personId
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    // 5. FSHI USER
    async delete(id) {
        const sql = `DELETE FROM person WHERE personId = ?`;
        await db.execute(sql, [id]);
    }
}

module.exports = new UserRepository();