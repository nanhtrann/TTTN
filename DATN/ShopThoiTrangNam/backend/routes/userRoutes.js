const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authAdmin } = require('../middleware/authMiddleware');

// Tất cả route quản lý user đều yêu cầu quyền admin
router.get('/', authAdmin, userController.getAllUsers);
router.get('/:id', authAdmin, userController.getUserById);
router.post('/', authAdmin, userController.createUser);
router.put('/:id', authAdmin, userController.updateUser);
router.delete('/:id', authAdmin, userController.deleteUser);

module.exports = router;