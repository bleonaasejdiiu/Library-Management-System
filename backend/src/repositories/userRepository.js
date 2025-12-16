const db = require('../config/db');

class UserRepository {
    
    // Për të gjetur userin me email (për Login më vonë)
    async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM Person WHERE email = ?', [email]);
        return rows[0];
    }

    // Për të krijuar një Member të ri (Regjistrimi)
    async createMember(personData) {
        // 1. Shto në tabelën Person
        const sqlPerson = `INSERT INTO Person (name, lastname, email, password, phoneNumber) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(sqlPerson, [
            personData.name, 
            personData.lastname, 
            personData.email, 
            personData.password, 
            personData.phoneNumber
        ]);

        const newPersonId = result.insertId; // Marrim ID-në e sapokrijuar

        // 2. Shto në tabelën Member duke përdorur ID e Personit
        const sqlMember = `INSERT INTO Member (personId, memberStatus) VALUES (?, 'Active')`;
        await db.execute(sqlMember, [newPersonId]);

        return newPersonId;
    }
}

module.exports = new UserRepository();