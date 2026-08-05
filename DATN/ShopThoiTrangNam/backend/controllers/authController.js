const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

// 1. Đăng ký tài khoản
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email này đã được sử dụng!' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user' // Mặc định là user nếu không truyền
        });

        res.status(201).json({ message: 'Đăng ký thành công!', user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// 2. Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm user theo email
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Email không tồn tại trong hệ thống!' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác!' });
        }

        // Tạo JWT Token (có hạn trong 1 ngày)
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'thoitrangnam_secret_key',
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Đăng nhập thành công!',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};