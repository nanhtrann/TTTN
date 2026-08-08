const express = require('express');
const path = require('path');
const app = express();

// 1. Phục vụ các file tĩnh từ thư mục dist (nơi chứa React đã build)
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Định nghĩa các API của bạn ở phía trên (Ví dụ)
app.get('/api/test', (req, res) => {
    res.json({ message: "Backend đang hoạt động!" });
});

// 3. SỬA LỖI TẠI ĐÂY:
// Dùng regex để khớp tất cả các route KHÔNG BẮT ĐẦU BẰNG /api
// Điều này giúp React Router xử lý các route riêng của nó
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Hoặc nếu bạn không có API nào bắt đầu bằng /api và muốn bắt tất cả:
// app.get('/*', (req, res) => {
//    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});