const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');

// === 1. IMPORT CÁC ROUTES ===
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const siteConfigRoutes = require('./routes/siteConfigRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// === 2. SỬ DỤNG ROUTES ===
app.use('/api/auth', authRoutes);
console.log('Đã nạp Auth Routes (/api/auth)')

app.use('/api/products', productRoutes);
console.log('Đã nạp Product Routes (/api/products)');

app.use('/api/categories', categoryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/news', newsRoutes);
console.log('Đã nạp toàn bộ API danh mục, banner, tin tức thành công!');

app.use('/api/users', userRoutes);
console.log('Đã nạp User Routes (/api/users)');

app.use('/api/profile', profileRoutes);
console.log('Đã nạp Profile Routes (/api/profile)');

app.use('/api/orders', orderRoutes);
console.log('Đã nạp Order Routes (/api/orders)');

app.use('/api/dashboard', dashboardRoutes);
console.log('Đã nạp Dashboard Routes (/api/dashboard)');

app.use('/api/site-config', siteConfigRoutes);
console.log('Đã nạp Site Config Routes (/api/site-config)');

// Đồng bộ database tự động tạo bảng trong MySQL
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Đã kết nối và đồng bộ toàn bộ bảng Database MySQL thành công!');
    })
    .catch((err) => {
        console.error('Lỗi kết nối hoặc đồng bộ Database:', err);
    });

// Route kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: 'API Shop Thời Trang Nam đang chạy ngon lành!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Backend đang chạy trên cổng ${PORT}`);
});