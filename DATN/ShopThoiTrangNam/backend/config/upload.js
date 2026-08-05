const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirs = {
    products: path.join(__dirname, '../uploads/products'),
    categories: path.join(__dirname, '../uploads/categories'),
    banners: path.join(__dirname, '../uploads/banners'),
    news: path.join(__dirname, '../uploads/news'),
    logo: path.join(__dirname, '../uploads/logo'),
};

// Tạo các thư mục nếu chưa tồn tại
Object.values(uploadDirs).forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const baseUrl = req.baseUrl || '';
        if (baseUrl.includes('/categories')) {
            cb(null, uploadDirs.categories);
        } else if (baseUrl.includes('/banners')) {
            cb(null, uploadDirs.banners);
        } else if (baseUrl.includes('/news')) {
            cb(null, uploadDirs.news);
        } else if (baseUrl.includes('/site-config')) {
            cb(null, uploadDirs.logo);
        } else {
            cb(null, uploadDirs.products);
        }
    },
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, '-');
        cb(null, `${Date.now()}-${safeName}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];
        if (!allowed.includes(file.mimetype)) {
            return cb(new Error('Chỉ hỗ trợ định dạng ảnh jpeg/png/webp/jpg/gif'));
        }
        cb(null, true);
    }
});

module.exports = upload;