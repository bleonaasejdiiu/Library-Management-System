const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, sendNotification } = require('../controllers/NotificationController');

router.get('/:memberId', getNotifications);
router.put('/:id/read', markAsRead);
router.post('/', sendNotification); // <--- Shtuar për POST

module.exports = router;
