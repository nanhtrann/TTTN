const express = require('express');
const path = require('path');
const app = express();

// Phục vụ giao diện từ thư mục dist
app.use(express.static(path.join(__dirname, 'dist')));

// API của bạn (ví dụ)
app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from Backend!" });
});

// Chuyển mọi request khác về index.html của React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT || 3000);