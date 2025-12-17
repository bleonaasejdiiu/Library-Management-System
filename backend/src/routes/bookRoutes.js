const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// 1. MERR LIBRAT (Këtë e ke)
router.get('/', bookController.getBooks);

// 2. SHTO LIBËR (Këtë e ke harruar!) <--- E RËNDËSISHME
router.post('/', bookController.addBook);

// 3. FSHI LIBËR (Edhe këtë e ke harruar!)
router.delete('/:id', bookController.deleteBook);

module.exports = router;