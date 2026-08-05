const jwt = require('jsonwebtoken');
const { Orders, OrderDetails, Products, Users } = require('../models');

exports.createOrder = async (req, res) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'thoitrangnam_secret_key');
        const { shipping_address, phone, payment_method = 'COD', items = [] } = req.body;

        if (!shipping_address || !phone) {
            return res.status(400).json({ message: 'Thiếu thông tin địa chỉ hoặc số điện thoại!' });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng đang trống!' });
        }

        const total_price = items.reduce((sum, item) => {
            const price = Number(item.price || 0);
            const quantity = Number(item.quantity || 1);
            return sum + price * quantity;
        }, 0);

// Kiểm tra tồn kho trước khi đặt hàng
        for (const item of items) {
            const product = await Products.findByPk(item.id);
            if (!product) {
                return res.status(400).json({ message: `Sản phẩm ID ${item.id} không tồn tại!` });
            }
            const qty = Number(item.quantity || 1);
            if (Number(product.quantity) < qty) {
                return res.status(400).json({ message: `Sản phẩm "${product.name}" không đủ hàng trong kho!` });
            }
        }

        const newOrder = await Orders.create({
            user_id: decoded.id,
            total_price,
            status: 'Pending',
            shipping_address,
            phone,
            payment_method
        });

        await Promise.all(items.map((item) => {
            return OrderDetails.create({
                order_id: newOrder.id,
                product_id: item.id,
                quantity: item.quantity,
                price: item.price
            });
        }));

        // Giảm số lượng tồn kho tương ứng với số lượng đặt mua
        await Promise.all(items.map((item) => {
            const qty = Number(item.quantity || 1);
            return Products.decrement({ quantity: qty }, { where: { id: item.id } });
        }));

        res.status(201).json({
            message: 'Đặt hàng thành công!',
            order: {
                id: newOrder.id,
                total_price,
                status: newOrder.status,
                shipping_address,
                phone,
                payment_method
            }
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
        }

        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// ADMIN: Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            include: [{ model: Users, attributes: ['id', 'name', 'email'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// ADMIN: Lấy chi tiết đơn hàng (kèm order details)
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.findByPk(id, {
            include: [
                { model: Users, attributes: ['id', 'name', 'email'] },
                { model: OrderDetails, include: [{ model: Products, attributes: ['id', 'name', 'image'] }] }
            ]
        });
        if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// ADMIN: Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Shipping', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ!' });
        }

        const order = await Orders.findByPk(id);
        if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });

        // Khóa trạng thái: đơn hàng đã hoàn thành hoặc đã hủy thì không thể thay đổi nữa
        const lockedStatuses = ['Completed', 'Cancelled'];
        if (lockedStatuses.includes(order.status)) {
            return res.status(400).json({
                message: order.status === 'Completed'
                    ? 'Đơn hàng đã giao thành công, không thể thay đổi trạng thái!'
                    : 'Đơn hàng đã bị hủy, không thể thay đổi trạng thái!'
            });
        }

// Chống chuyển trực tiếp từ Pending sang Completed (bắt buộc qua Shipping nếu muốn ràng buộc chặt)
        // Nếu muốn bỏ qua bước này, xóa đoạn dưới
        if (status === 'Completed' && order.status !== 'Shipping') {
            return res.status(400).json({ message: 'Đơn hàng phải ở trạng thái Đang giao trước khi xác nhận hoàn thành!' });
        }

        // Nếu đơn hàng bị hủy (giao thất bại) => hoàn lại số lượng tồn kho
        if (status === 'Cancelled' && order.status !== 'Cancelled') {
            const details = await OrderDetails.findAll({ where: { order_id: order.id } });
            await Promise.all(details.map((detail) => {
                return Products.increment(
                    { quantity: Number(detail.quantity) },
                    { where: { id: detail.product_id } }
                );
            }));
        }

        await order.update({ status });
        res.json({ message: 'Cập nhật trạng thái đơn hàng thành công!', order });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// ADMIN: Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.findByPk(id);
        if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });

        // Hoàn lại số lượng tồn kho nếu đơn hàng chưa hoàn thành
        // (trả lại hàng về kho khi đơn bị xóa, trừ khi đã Completed)
        if (order.status !== 'Completed') {
            const details = await OrderDetails.findAll({ where: { order_id: id } });
            await Promise.all(details.map((detail) => {
                return Products.increment(
                    { quantity: Number(detail.quantity) },
                    { where: { id: detail.product_id } }
                );
            }));
        }

        // Xóa order details trước
        await OrderDetails.destroy({ where: { order_id: id } });
        await order.destroy();
        res.json({ message: 'Xóa đơn hàng thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'thoitrangnam_secret_key');

        const orders = await Orders.findAll({
            where: { user_id: decoded.id },
            include: [
                { 
                    model: OrderDetails, 
                    include: [{ model: Products, attributes: ['id', 'name', 'image'] }] 
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
        }

        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
