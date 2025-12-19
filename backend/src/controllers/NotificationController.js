const db = require('../config/db');

class NotificationController {
    // Merr njoftimet e palexuara
    async getNotifications(req, res) {
        try {
            const { memberId } = req.params;
            const sql = 'SELECT * FROM notification WHERE memberId = ? AND isRead = 0 ORDER BY createdAt DESC';
            const [rows] = await db.execute(sql, [memberId]);
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Shëno si të lexuar
    async markAsRead(req, res) {
        try {
            const { id } = req.params;
            const sql = 'UPDATE notification SET isRead = 1 WHERE id = ?';
            await db.execute(sql, [id]);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Dërgo njoftim manual (për testim)
    async sendNotification(req, res) {
        try {
            const { memberId, message } = req.body;
            const sql = 'INSERT INTO notification (memberId, message) VALUES (?, ?)';
            await db.execute(sql, [memberId, message]);
            res.status(201).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new NotificationController();