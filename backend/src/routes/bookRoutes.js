const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// 1. MERR LIBRAT (Këtë e ke)
router.get('/', bookController.getBooks);

// 2. SHTO LIBËR (Këtë e ke harruar!) <--- E RËNDËSISHME
router.post('/', bookController.addBook);

// 3. FSHI LIBËR (Edhe këtë e ke harruar!)
router.delete('/:id', bookController.deleteBook);

router.put('/:id', bookController.updateBook);

// MERR DETAJET E NJË LIBRI
router.get('/:id', bookController.getBookById);

// HUAZIMI I LIBRIT
router.post('/:id/borrow', bookController.borrowBook);

router.get("/member/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(
    `SELECT l.*, b.title
     FROM loan l
     JOIN book b ON l.bookId = b.bookid
     WHERE l.memberId = ?`,
    [id]
  );
  res.json(rows);
});

module.exports = router;