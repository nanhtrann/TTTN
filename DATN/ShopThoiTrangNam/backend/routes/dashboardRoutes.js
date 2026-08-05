const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authAdmin } = require('../middleware/authMiddleware');

// Tất cả route dashboard đều yêu cầu quyền admin
router.get('/stats', authAdmin, dashboardController.getStats);
router.get('/chart-data', authAdmin, dashboardController.getChartData);

module.exports = router;