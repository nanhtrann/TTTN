const { Products, Categories, Orders, Users, OrderDetails, sequelize } = require('../models');
const { Op } = require('sequelize');

// GET /api/dashboard/stats - Thống kê tổng quan cho Admin Dashboard
exports.getStats = async (req, res) => {
    try {
        const totalProducts = await Products.count();
        const totalCategories = await Categories.count();
        const totalOrders = await Orders.count();
        const totalUsers = await Users.count();

        // Thống kê đơn hàng theo trạng thái
        const pendingOrders = await Orders.count({ where: { status: 'Pending' } });
        const shippingOrders = await Orders.count({ where: { status: 'Shipping' } });
        const completedOrders = await Orders.count({ where: { status: 'Completed' } });
        const cancelledOrders = await Orders.count({ where: { status: 'Cancelled' } });

        // Thống kê người dùng theo vai trò
        const superAdmins = await Users.count({ where: { role: 'superadmin' } });
        const admins = await Users.count({ where: { role: 'admin' } });
        const normalUsers = await Users.count({ where: { role: 'user' } });

        // Doanh thu tổng (từ đơn Completed)
        const revenueResult = await Orders.sum('total_price', { where: { status: 'Completed' } });
        const totalRevenue = revenueResult || 0;

        res.json({
            totalProducts,
            totalCategories,
            totalOrders,
            totalUsers,
            orderStats: {
                pending: pendingOrders,
                shipping: shippingOrders,
                completed: completedOrders,
                cancelled: cancelledOrders
            },
            userStats: {
                superadmin: superAdmins,
                admin: admins,
                user: normalUsers
            },
totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// GET /api/dashboard/chart-data - Dữ liệu biểu đồ cho Admin Dashboard
exports.getChartData = async (req, res) => {
    try {
        // === 1. Doanh thu theo 7 ngày gần nhất (bar chart) ===
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const day = new Date();
            day.setHours(0, 0, 0, 0);
            day.setDate(day.getDate() - i);
            const next = new Date(day);
            next.setDate(next.getDate() + 1);

            const revenue = await Orders.sum('total_price', {
                where: {
                    status: 'Completed',
                    createdAt: { [Op.gte]: day, [Op.lt]: next }
                }
            });
            const orderCount = await Orders.count({
                where: {
                    createdAt: { [Op.gte]: day, [Op.lt]: next }
                }
            });

            last7Days.push({
                date: day.toISOString().slice(0, 10),
                label: day.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit' }),
                revenue: revenue || 0,
                orders: orderCount
            });
        }

        // === 2. Đơn hàng & doanh thu theo 6 tháng gần nhất (line chart) ===
        const monthly = [];
        for (let i = 5; i >= 0; i--) {
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

            const orderCount = await Orders.count({
                where: { createdAt: { [Op.gte]: monthStart, [Op.lt]: monthEnd } }
            });
            const revenue = await Orders.sum('total_price', {
                where: {
                    status: 'Completed',
                    createdAt: { [Op.gte]: monthStart, [Op.lt]: monthEnd }
                }
            });

            monthly.push({
                label: monthStart.toLocaleDateString('vi-VN', { month: 'short', year: '2-digit' }),
                orders: orderCount,
                revenue: revenue || 0
            });
        }

// === 3. Top 5 sản phẩm bán chạy (horizontal bar) ===
        const [topProductsData] = await sequelize.query(
            `SELECT od.product_id, SUM(od.quantity) as totalQty, SUM(od.quantity * od.price) as totalRevenue,
                    p.name, p.image
             FROM order_details od
             JOIN products p ON p.id = od.product_id
             GROUP BY od.product_id, p.id, p.name, p.image
             ORDER BY totalQty DESC
             LIMIT 5`
        );

        const topProducts = topProductsData.map((item) => ({
            name: item.name || `Sản phẩm #${item.product_id}`,
            image: item.image || null,
            quantity: Number(item.totalQty || 0),
            revenue: Number(item.totalRevenue || 0)
        }));

        // === 4. Phân bố đơn hàng theo trạng thái (donut) ===
        const statusDistribution = [];
        const statusLabels = {
            Pending: { label: 'Chờ xử lý', color: '#facc15' },
            Shipping: { label: 'Đang giao', color: '#3b82f6' },
            Completed: { label: 'Hoàn thành', color: '#22c55e' },
            Cancelled: { label: 'Đã hủy', color: '#ef4444' }
        };
        for (const [key, meta] of Object.entries(statusLabels)) {
            const count = await Orders.count({ where: { status: key } });
            statusDistribution.push({ status: key, label: meta.label, color: meta.color, value: count });
        }

        res.json({
            last7Days,
            monthly,
            topProducts,
            statusDistribution
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
