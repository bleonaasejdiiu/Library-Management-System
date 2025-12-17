const db = require('../config/db');

class UserRepository {
    async findAll() {
        const sql = `SELECT * FROM person`;
        const [rows] = await db.execute(sql);
        return rows;
    }

    async delete(id) {
        const sql = `DELETE FROM person WHERE personId = ?`;
        await db.execute(sql, [id]);
    }
}

module.exports = new UserRepository();
