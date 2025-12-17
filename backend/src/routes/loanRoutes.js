const express = require('express');
const router = express.Router();
const loanController = require('../controllers/LoanController');

// Route për të marrë listën: GET /api/loans
router.get('/', loanController.getLoans);

// Route për të kthyer librin: PUT /api/loans/:id/return
router.put('/:id/return', loanController.returnBook);

module.exports = router;