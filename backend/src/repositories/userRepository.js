const db = require('../config/db');

class UserRepository {
    
    // 1. LOGIN: Gjej userin bazë te tabela person
    async findByEmail(email) {
        // Kujdes: Sigurohu që emrat e kolonave (lastname vs surname) përputhen me DB tënde
        const sql = 'SELECT * FROM person WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    }

    // 2. GET ROLE: Kontrollojmë edhe Librarian edhe Member (JOIN i dyfishtë)
    async getRole(email) {
        const sql = `
            SELECT 
                l.role as adminRole, 
                m.role as userRole 
            FROM person p
            LEFT JOIN librarian l ON p.personId = l.personId
            LEFT JOIN member m ON p.personId = m.personId -- (ose memberId nese lidhen me ID)
            WHERE p.email = ?
        `;
        
        const [rows] = await db.execute(sql, [email]);
        
        if (!rows[0]) return null;

        // Prioriteti: Admin -> User -> Default 'member'
        return rows[0].adminRole || rows[0].userRole || 'member';
    }

    // 3. REGJISTRIM (THELBËSORE: Shto në Person DHE në Member)
    // 3. REGJISTRIM
    async create(user) {
        // Hapi A: Shto te Person
        // Kujdes: Sigurohu që emrat e kolonave në DB janë saktë (name, lastname, email, etj)
        const sqlPerson = `
            INSERT INTO person (name, lastname, email, password, phoneNumber) 
            VALUES (?, ?, ?, ?, ?)
        `;

        // ZGJIDHJA E ERRORIT:
        // Përdorim "|| null" që nëse variabla është undefined, të shkojë si NULL në database.
        // Gjithashtu kontrollojmë variacionet e emrave (firstName vs name).
        const values = [
            user.firstName || user.name,          // Merr firstName (nga React) ose name
            user.lastName || user.surname || user.lastname, // Merr lastName (nga React) ose lastname
            user.email, 
            user.password,
            user.phone || user.phoneNumber || null // Merr phone (nga React) ose phoneNumber. Nese ska, beje null.
        ];

        const [result] = await db.execute(sqlPerson, values);
        
        const newPersonId = result.insertId;

        // Hapi B: Shto te Member (Me rolin 'User')
        const sqlMember = `INSERT INTO member (personId, role) VALUES (?, 'User')`;
        await db.execute(sqlMember, [newPersonId]);

        return newPersonId;
    }

    // 4. LISTA E USERAVE (Admin Dashboard)
    async findAll() {
        // I marrim të gjithë dhe shohim rolet e tyre
        const sql = `
            SELECT p.*, 
                   COALESCE(l.role, m.role, 'User') as role 
            FROM person p
            LEFT JOIN librarian l ON p.personId = l.personId
            LEFT JOIN member m ON p.personId = m.personId
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    // 5. FSHI USER
    async delete(id) {
        // Meqë kemi ON DELETE CASCADE në DB (zakonisht), mjafton të fshish personin
        const sql = `DELETE FROM person WHERE personId = ?`;
        await db.execute(sql, [id]);
    }
}

module.exports = new UserRepository();