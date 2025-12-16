const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kur dikush bën POST tek /register, thirret funksioni i controller-it
router.post('/register', authController.register);

module.exports = router;