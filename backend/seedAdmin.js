const db = require('./src/config/db'); // Sigurohu që rruga është e saktë
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
    try {
        console.log("⏳ Duke krijuar Adminin...");

        // 1. Të dhënat e Adminit
        const adminData = {
            name: "Super",
            lastname: "Admin",
            email: "admin@library.com",
            password: "admin123", // Këtë do ta bëjmë hash
            phoneNumber: "044123123"
        };

        // 2. Hash Passwordin
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // 3. Kontrollo nëse ekziston ky email (që mos ta krijojmë 2 herë)
        const [existing] = await db.execute('SELECT * FROM Person WHERE email = ?', [adminData.email]);
        if (existing.length > 0) {
            console.log("⚠️ Ky Admin ekziston tashmë në databazë!");
            process.exit();
        }

        // 4. Shto në tabelën Person
        const sqlPerson = `INSERT INTO Person (name, lastname, email, password, phoneNumber) VALUES (?, ?, ?, ?, ?)`;
        const [personResult] = await db.execute(sqlPerson, [
            adminData.name,
            adminData.lastname,
            adminData.email,
            hashedPassword,
            adminData.phoneNumber
        ]);

        const personId = personResult.insertId; // Marrim ID e re

        // 5. Shto në tabelën Librarian (Kjo e bën Admin)
        // Kujdes: Nëse ke fusha të tjera 'Not Null' në Librarian (si rroga), shtoji këtu.
        const sqlLibrarian = `INSERT INTO Librarian (personId) VALUES (?)`;
        await db.execute(sqlLibrarian, [personId]);

        console.log("✅ Admin u krijua me sukses!");
        console.log(`📧 Email: ${adminData.email}`);
        console.log(`🔑 Password: ${adminData.password}`);

    } catch (error) {
        console.error("❌ Gabim gjatë krijimit të Adminit:", error);
    } finally {
        // Mbyllim procesin
        process.exit();
    }
};

createAdmin();