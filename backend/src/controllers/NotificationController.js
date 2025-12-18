const db = require('../config/db');

const getNotifications = (req, res) => {
  const memberId = req.params.memberId;
  console.log('Marr njoftimet për memberId:', memberId);

  const query = 'SELECT * FROM notification WHERE memberId = ? AND isRead = 0 ORDER BY createdAt DESC';
  db.query(query, [memberId], (err, results) => {
    if (err) {
      console.error("Gabim në DB:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const markAsRead = (req, res) => {
  const notificationId = req.params.id;
  const query = 'UPDATE notification SET isRead = 1 WHERE id = ?';
  db.query(query, [notificationId], (err, results) => {
    if (err) {
      console.error("Gabim në DB:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
};

// Funksioni për të dërguar/ruajtur një njoftim të ri
const sendNotification = (req, res) => {
  const { memberId, message } = req.body;
  console.log('Notification POST body:', req.body);

  if (!memberId || !message) {
    return res.status(400).json({ error: 'memberId dhe message janë të detyrueshme.' });
  }

  const query = 'INSERT INTO notification (memberId, message, isRead, createdAt) VALUES (?, ?, 0, NOW())';
  db.query(query, [memberId, message], (err, results) => {
    if (err) {
      console.error('Gabim gjatë dërgimit të njoftimit:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, message: 'Notification sent.' });
  });
};

module.exports = {
  getNotifications,
  markAsRead,
  sendNotification
};
