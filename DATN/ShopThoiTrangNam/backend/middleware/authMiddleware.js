const jwt = require('jsonwebtoken');

// Middleware: Xác thực token JWT
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Bạn chưa đăng nhập! Token không tồn tại.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'thoitrangnam_secret_key');
        req.user = decoded; // { id, email, role }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }
};

// Middleware: Kiểm tra quyền admin (superadmin hoặc admin)
exports.requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Chưa xác thực!' });
    }

    const allowedRoles = ['superadmin', 'admin'];
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Bạn không có quyền truy cập chức năng này!' });
    }

    next();
};

// Middleware: Kiểm tra quyền super admin (chỉ superadmin)
exports.requireSuperAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Chưa xác thực!' });
    }

    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Chỉ Super Admin mới có quyền thực hiện thao tác này!' });
    }

    next();
};

// Middleware kết hợp: verifyToken + requireAdmin
exports.authAdmin = [exports.verifyToken, exports.requireAdmin];

// Middleware kết hợp: verifyToken + requireSuperAdmin
exports.authSuperAdmin = [exports.verifyToken, exports.requireSuperAdmin];