const db = require('../config/db');

class UserRepository {
    
    // 1. LOGIN: Gjej userin dhe MERR memberId-në e tij nga tabela member
    async findByEmail(email) {
        const sql = `
            SELECT p.*, m.memberId 
            FROM person p 
            LEFT JOIN member m ON p.personId = m.personId 
            WHERE p.email = ?
        `;
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    }

    // 2. GET ROLE
    async getRole(email) {
        const sql = `
            SELECT 
                l.role as adminRole, 
                m.role as userRole 
            FROM person p
            LEFT JOIN librarian l ON p.personId = l.personId
            LEFT JOIN member m ON p.personId = m.personId
            WHERE p.email = ?
        `;
        
        const [rows] = await db.execute(sql, [email]);
        if (!rows[0]) return null;
        return rows[0].adminRole || rows[0].userRole || 'member';
    }

    // 3. REGJISTRIM
    async create(user) {
        // Hapi A: Shto te Person
        const sqlPerson = `
            INSERT INTO person (name, lastname, email, password, phoneNumber) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            user.firstName || user.name,
            user.lastName || user.surname || user.lastname,
            user.email, 
            user.password,
            user.phone || user.phoneNumber || null
        ];

        const [result] = await db.execute(sqlPerson, values);
        const newPersonId = result.insertId;

        // Hapi B: Shto te Member (Me rolin 'User')
        const sqlMember = `INSERT INTO member (personId, role) VALUES (?, 'User')`;
        await db.execute(sqlMember, [newPersonId]);

        return newPersonId;
    }

    // 4. LISTA E USERAVE
    async findAll() {
        const sql = `
            SELECT p.*, m.memberId,
                   COALESCE(l.role, m.role, 'User') as role 
            FROM person p
            LEFT JOIN librarian l ON p.personId = l.personId
            LEFT JOIN member m ON p.personId = m.personId
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    async delete(id) {
        const sql = `DELETE FROM person WHERE personId = ?`;
        await db.execute(sql, [id]);
    }
}

module.exports = new UserRepository();