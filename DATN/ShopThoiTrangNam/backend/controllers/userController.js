const { Users } = require('../models');
const bcrypt = require('bcryptjs');

// Lấy danh sách user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Lấy chi tiết user theo ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Thêm user mới (Admin tạo)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ họ tên, email và mật khẩu!' });
        }

        const existing = await Users.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: 'Email đã tồn tại!' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({
            message: 'Thêm người dùng thành công!',
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Cập nhật thông tin/role user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng!' });

        const updateData = { ...req.body };

        // Nếu có password mới thì hash lại
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        } else {
            delete updateData.password;
        }

        // Chỉ superadmin mới được đổi role thành superadmin
        if (updateData.role === 'superadmin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Chỉ Super Admin mới có thể gán quyền Super Admin!' });
        }

        await user.update(updateData);
        res.json({
            message: 'Cập nhật thành công!',
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Xóa user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Không cho phép xóa chính mình
        if (Number(id) === Number(req.user.id)) {
            return res.status(400).json({ message: 'Bạn không thể xóa chính mình!' });
        }

        const user = await Users.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng!' });

        // Không cho phép xóa superadmin (trừ khi chính superadmin đó thực hiện)
        if (user.role === 'superadmin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Không thể xóa Super Admin!' });
        }

        await user.destroy();
        res.json({ message: 'Xóa người dùng thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};