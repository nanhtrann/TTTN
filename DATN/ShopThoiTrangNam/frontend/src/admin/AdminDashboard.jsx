import React, { useEffect, useState } from 'react';
import dashboardService from '../services/dashboardService';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import orderService from '../services/orderService';
import userService from '../services/userService';
import ChartCard, { BarChart, LineChart, DonutChart, HorizontalBarChart } from '../components/Charts';
import { Package, Layers3, ShoppingCart, Users, DollarSign, Clock, Truck, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

// Xây dựng dữ liệu biểu đồ dự phòng từ stats (chỉ có donut trạng thái)
function buildFallbackChart(stats) {
    const orderStats = stats?.orderStats || {};
    return {
        last7Days: [],
        monthly: [],
        topProducts: [],
        statusDistribution: [
            { status: 'Pending', label: 'Chờ xử lý', value: orderStats.pending ?? 0, color: '#facc15' },
            { status: 'Shipping', label: 'Đang giao', value: orderStats.shipping ?? 0, color: '#3b82f6' },
            { status: 'Completed', label: 'Hoàn thành', value: orderStats.completed ?? 0, color: '#22c55e' },
            { status: 'Cancelled', label: 'Đã hủy', value: orderStats.cancelled ?? 0, color: '#ef4444' },
        ],
    };
}

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [usingFallback, setUsingFallback] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
// Phương pháp 1: Gọi API dashboard chính (yêu cầu token admin)
            try {
                const [data, chart] = await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getChartData().catch(() => null),
                ]);
                setStats(data);
                setChartData(chart || buildFallbackChart(data));
                setLoading(false);
                return;
            } catch (err) {
                console.warn('API dashboard lỗi, thử phương pháp dự phòng:', err.response?.status);
            }

            // Phương pháp 2: Dự phòng - gọi các API public để lấy số lượng
            try {
                const [products, categories, orders, users] = await Promise.all([
                    productService.getAllProducts(),
                    categoryService.getAllCategories(),
                    orderService.getAllOrders().catch(() => []),
                    userService.getAllUsers().catch(() => []),
                ]);

                const orderStats = {
                    pending: orders.filter(o => o.status === 'Pending').length,
                    shipping: orders.filter(o => o.status === 'Shipping').length,
                    completed: orders.filter(o => o.status === 'Completed').length,
                    cancelled: orders.filter(o => o.status === 'Cancelled').length,
                };

                const userStats = {
                    superadmin: users.filter(u => u.role === 'superadmin').length,
                    admin: users.filter(u => u.role === 'admin').length,
                    user: users.filter(u => u.role === 'user').length,
                };

                const totalRevenue = orders
                    .filter(o => o.status === 'Completed')
                    .reduce((sum, o) => sum + Number(o.total_price || 0), 0);

                setStats({
                    totalProducts: products.length,
                    totalCategories: categories.length,
                    totalOrders: orders.length,
                    totalUsers: users.length,
                    orderStats,
                    userStats,
                    totalRevenue,
                });
                setChartData({
                    last7Days: [],
                    monthly: [],
                    topProducts: [],
                    statusDistribution: Object.entries(orderStats).map(([k, v]) => ({
                        status: k,
                        value: v,
                        label: { pending: 'Chờ xử lý', shipping: 'Đang giao', completed: 'Hoàn thành', cancelled: 'Đã hủy' }[k],
                        color: { pending: '#facc15', shipping: '#3b82f6', completed: '#22c55e', cancelled: '#ef4444' }[k],
                    })),
                });
                setUsingFallback(true);
                setLoading(false);
            } catch (err2) {
                setError('Không thể tải thống kê. Vui lòng đăng nhập lại với tài khoản admin.');
                console.error('Lỗi tải dashboard:', err2);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Tổng quan Admin</h1>
                <div className="text-slate-300">Đang tải thống kê...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Tổng quan Admin</h1>
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={20} />
                        <span className="font-semibold">{error}</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">
                        Mẹo: Đăng xuất và đăng nhập lại bằng tài khoản admin (superadmin@hype.com / 123456)
                    </p>
                </div>
            </div>
        );
    }

    const mainCards = [
        { label: 'Tổng sản phẩm', value: stats.totalProducts, icon: Package, tone: 'from-red-500 to-orange-500' },
        { label: 'Tổng danh mục', value: stats.totalCategories, icon: Layers3, tone: 'from-cyan-500 to-blue-500' },
        { label: 'Tổng đơn hàng', value: stats.totalOrders, icon: ShoppingCart, tone: 'from-violet-500 to-purple-500' },
        { label: 'Tổng người dùng', value: stats.totalUsers, icon: Users, tone: 'from-emerald-500 to-green-500' },
    ];

    const orderStats = [
        { label: 'Chờ xử lý', value: stats.orderStats?.pending ?? 0, icon: Clock, color: 'text-yellow-400' },
        { label: 'Đang giao', value: stats.orderStats?.shipping ?? 0, icon: Truck, color: 'text-blue-400' },
        { label: 'Hoàn thành', value: stats.orderStats?.completed ?? 0, icon: CheckCircle, color: 'text-green-400' },
        { label: 'Đã hủy', value: stats.orderStats?.cancelled ?? 0, icon: XCircle, color: 'text-red-400' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Tổng quan Admin</h1>

            {usingFallback && (
                <div className="mb-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-yellow-400 text-sm flex items-center gap-2">
                    <AlertCircle size={18} />
                    <span>Đang dùng phương pháp dự phòng. Một số thống kê có thể không đầy đủ nếu không có quyền admin.</span>
                </div>
            )}

            {/* Thẻ thống kê chính */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {mainCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${card.tone}`} />
                                <Icon className="text-slate-500" size={24} />
                            </div>
                            <div className="text-slate-400 text-sm">{card.label}</div>
                            <div className="text-4xl font-bold mt-2">{card.value}</div>
                        </div>
                    );
                })}
            </div>

            {/* Doanh thu */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-600/20 to-green-600/10 p-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-emerald-500/20 p-3">
                        <DollarSign className="text-emerald-400" size={28} />
                    </div>
                    <div>
                        <div className="text-slate-400 text-sm">Tổng doanh thu (đơn hoàn thành)</div>
                        <div className="text-3xl font-bold text-emerald-400 mt-1">
                            {Number(stats.totalRevenue || 0).toLocaleString('vi-VN')} đ
                        </div>
                    </div>
                </div>
            </div>

            {/* Thống kê đơn hàng theo trạng thái */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Thống kê đơn hàng</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {orderStats.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon className={item.color} size={20} />
                                    <span className="text-sm text-slate-400">{item.label}</span>
                                </div>
                                <div className="text-2xl font-bold">{item.value}</div>
                            </div>
                        );
})}
                </div>
            </div>

            {/* ------- BIỂU ĐỒ THỐNG KÊ ------- */}
            {chartData && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="text-emerald-400" size={22} />
                        Biểu đồ thống kê
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Biểu đồ cột: Doanh thu 7 ngày gần nhất */}
                        <ChartCard title="Doanh thu 7 ngày gần nhất" subtitle="Đơn vị: VNĐ">
                            {chartData.last7Days && chartData.last7Days.length > 0 ? (
                                <BarChart
                                    data={chartData.last7Days.map(d => ({ label: d.label, value: d.revenue }))}
                                    color="#10b981"
                                    formatValue={(v) => `${Number(v).toLocaleString('vi-VN')}đ`}
                                />
                            ) : (
                                <div className="text-sm text-slate-500 py-10 text-center">Chưa có dữ liệu doanh thu 7 ngày gần nhất.</div>
                            )}
                        </ChartCard>

                        {/* Biểu đồ đường: Đơn hàng theo 6 tháng */}
                        <ChartCard title="Đơn hàng theo 6 tháng" subtitle="Số lượng đơn hàng mỗi tháng">
                            {chartData.monthly && chartData.monthly.length > 0 ? (
                                <LineChart
                                    data={chartData.monthly.map(m => ({ label: m.label, value: m.orders }))}
                                    color="#3b82f6"
                                    formatValue={(v) => `${v} đơn`}
                                />
                            ) : (
                                <div className="text-sm text-slate-500 py-10 text-center">Chưa có dữ liệu đơn hàng theo tháng.</div>
                            )}
                        </ChartCard>

                        {/* Biểu đồ tròn: Phân bố đơn theo trạng thái */}
                        <ChartCard title="Phân bố đơn hàng theo trạng thái" subtitle="Tỷ lệ các trạng thái đơn hiện tại">
                            {chartData.statusDistribution && chartData.statusDistribution.length > 0 ? (
                                <DonutChart data={chartData.statusDistribution.map(d => ({ label: d.label, value: d.value, color: d.color }))} />
                            ) : (
                                <div className="text-sm text-slate-500 py-10 text-center">Chưa có dữ liệu.</div>
                            )}
                        </ChartCard>

                        {/* Biểu đồ cột ngang: Top sản phẩm bán chạy */}
                        <ChartCard title="Top sản phẩm bán chạy" subtitle="Theo số lượng đã bán">
                            {chartData.topProducts && chartData.topProducts.length > 0 ? (
                                <HorizontalBarChart
                                    data={chartData.topProducts.map(p => ({ label: p.name, value: p.quantity, image: p.image }))}
                                    color="#f59e0b"
                                    formatValue={(v) => `${v} sản phẩm`}
                                />
                            ) : (
                                <div className="text-sm text-slate-500 py-10 text-center">Chưa có sản phẩm nào được bán.</div>
                            )}
                        </ChartCard>
                    </div>
                </div>
            )}

            {/* Thống kê người dùng theo vai trò */}
            <div>
                <h2 className="text-xl font-bold mb-4">Thống kê người dùng</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                        <div className="text-sm text-slate-400 mb-2">Super Admin</div>
                        <div className="text-2xl font-bold text-red-400">{stats.userStats?.superadmin ?? 0}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                        <div className="text-sm text-slate-400 mb-2">Admin</div>
                        <div className="text-2xl font-bold text-blue-400">{stats.userStats?.admin ?? 0}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                        <div className="text-sm text-slate-400 mb-2">User</div>
                        <div className="text-2xl font-bold text-slate-300">{stats.userStats?.user ?? 0}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}