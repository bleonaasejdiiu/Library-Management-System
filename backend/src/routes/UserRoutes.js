const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserControllers');

router.get('/', userController.getUsers);
router.delete('/:id', userController.deleteUser);

module.exports = router;
