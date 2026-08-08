require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cấp quyền truy cập thư mục chứa ảnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 1. CẤU HÌNH KẾT NỐI MYSQL TỪ .ENV ---
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mens_fashion_shop',
    port: process.env.DB_PORT || 3306
};

async function testDBConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log(' Kết nối MySQL thành công!');
        await connection.end();
    } catch (error) {
        console.error(' Lỗi kết nối MySQL:', error.message);
    }
}
testDBConnection();

// --- 2. API CHO BANNER ---
app.get('/api/banners', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM banners');
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/banners/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM banners WHERE id = ?', [id]);
        await connection.end();
        if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy banner' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 3. API CHO CATEGORY ---
app.get('/api/categories', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM categories');
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM categories WHERE id = ?', [id]);
        await connection.end();
        if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 4. API CHO DASHBOARD ---
app.get('/api/dashboard/stats', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.end();
        res.json({
            totalProducts: 0,
            totalOrders: 0,
            totalUsers: 0,
            totalRevenue: 0
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/dashboard/chart-data', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.end();
        res.json({
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
            datasets: []
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 5. API CHO NEWS ---
app.get('/api/news', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM news');
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/news/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM news WHERE id = ?', [id]);
        await connection.end();
        if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy tin tức' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 6. API CHO ORDERS ---
app.post('/api/orders', async (req, res) => {
    try {
        const payload = req.body;
        const connection = await mysql.createConnection(dbConfig);
        await connection.end();
        res.status(201).json({ message: 'Tạo đơn hàng thành công', payload });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders/my', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM orders'); 
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM orders');
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM orders WHERE id = ?', [id]);
        await connection.end();
        if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
        await connection.end();
        res.json({ message: `Đã cập nhật trạng thái đơn hàng ${id} thành ${status}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM orders WHERE id = ?', [id]);
        await connection.end();
        res.json({ message: `Đã xóa đơn hàng ${id}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 7. API CHO PRODUCTS ---
app.get('/api/products/search', async (req, res) => {
    try {
        const { q } = req.query;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM products WHERE name LIKE ?', [`%${q}%`]);
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM products');
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
        await connection.end();
        if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const data = req.body;
        const connection = await mysql.createConnection(dbConfig);
        await connection.end();
        res.status(201).json({ message: 'Tạo sản phẩm thành công', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const connection = await mysql.createConnection(dbConfig);
        await connection.end();
        res.json({ message: `Cập nhật sản phẩm ${id} thành công` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM products WHERE id = ?', [id]);
        await connection.end();
        res.json({ message: `Đã xóa sản phẩm ${id}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 8. API CHO SITE CONFIG ---
app.get('/api/site-config', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM site_config LIMIT 1');
        await connection.end();
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/site-config', async (req, res) => {
    try {
        const data = req.body;
        const connection = await mysql.createConnection(dbConfig);
        await connection.end();
        res.json({ message: 'Cập nhật cấu hình trang web thành công', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 9. API CHO USERS ---
app.get('/api/users', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT id, name, email, role FROM users');
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
        await connection.end();
        if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const data = req.body;
        const connection = await mysql.createConnection(dbConfig);
        await connection.end();
        res.status(201).json({ message: 'Tạo người dùng thành công', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const connection = await mysql.createConnection(dbConfig);
        await connection.end();
        res.json({ message: `Cập nhật người dùng ${id} thành công` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM users WHERE id = ?', [id]);
        await connection.end();
        res.json({ message: `Đã xóa người dùng ${id}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 10. PHỤC VỤ GIAO DIỆN REACT (ĐẶT Ở CUỐI CÙNG) ---
app.use(express.static(path.join(__dirname, 'dist')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- 11. KHỞI ĐỘNG SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server đang chạy tại cổng ${PORT}`);
});