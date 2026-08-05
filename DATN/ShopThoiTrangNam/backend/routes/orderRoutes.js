const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authAdmin } = require('../middleware/authMiddleware');

// Routes cho người dùng
router.post('/', orderController.createOrder);
router.get('/my', orderController.getMyOrders);

// Routes cho Admin (yêu cầu quyền admin)
router.get('/', authAdmin, orderController.getAllOrders);
router.get('/:id', authAdmin, orderController.getOrderById);
router.put('/:id/status', authAdmin, orderController.updateOrderStatus);
router.delete('/:id', authAdmin, orderController.deleteOrder);

module.exports = router;