const express = require('express');
const router = express.Router();
const siteConfigController = require('../controllers/siteConfigController');
const { verifyToken, authAdmin } = require('../middleware/authMiddleware');
const upload = require('../config/upload');

// GET - Public (ai cũng xem được cấu hình giao diện)
router.get('/', siteConfigController.getSiteConfig);

// PUT - Yêu cầu admin, hỗ trợ upload logo
router.put('/', authAdmin, upload.single('logo'), siteConfigController.updateSiteConfig);

module.exports = router;