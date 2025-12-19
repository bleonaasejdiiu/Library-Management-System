const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.post('/:id/reserve', bookController.reserveBook);
router.get('/member/:id/reservations', bookController.getMemberReservations);
router.get('/member/:id', bookController.getMemberLoans);
router.delete('/:id', bookController.deleteBook);

// Huazimi
router.post('/:id/borrow', bookController.borrowBook);


// Merr huazimet e një anëtari
router.get('/member/:id', bookController.getMemberLoans);

module.exports = router;