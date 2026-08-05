import React from 'react';
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Layers3, Image as ImageIcon, Newspaper, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminBanners from './AdminBanners';
import AdminNews from './AdminNews';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';
import { isAdmin, getCurrentUser, logout } from '../utils/adminAuth';

const menu = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['superadmin', 'admin'] },
    { to: '/admin/products', label: 'Sản phẩm', icon: Package, roles: ['superadmin', 'admin'] },
    { to: '/admin/categories', label: 'Danh mục', icon: Layers3, roles: ['superadmin', 'admin'] },
    { to: '/admin/banners', label: 'Banner', icon: ImageIcon, roles: ['superadmin', 'admin'] },
    { to: '/admin/news', label: 'Tin tức', icon: Newspaper, roles: ['superadmin', 'admin'] },
    { to: '/admin/orders', label: 'Đơn hàng', icon: ShoppingCart, roles: ['superadmin', 'admin'] },
    { to: '/admin/users', label: 'Người dùng', icon: Users, roles: ['superadmin', 'admin'] },
    { to: '/admin/settings', label: 'Giao diện', icon: Settings, roles: ['superadmin', 'admin'] },
];

export default function AdminLayout() {
    const navigate = useNavigate();

    // Kiểm tra quyền admin
    if (!isAdmin()) {
        return <Navigate to="/login" replace />;
    }

    const currentUser = getCurrentUser();
    const visibleMenu = menu.filter((item) => item.roles.includes(currentUser?.role));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="flex min-h-screen">
                <aside className="w-72 border-r border-white/10 bg-slate-900/80 p-5 flex flex-col">
                    <div className="mb-8">
                        <div className="text-2xl font-black text-red-500 tracking-[0.3em]">HYPEMAN ADMIN</div>
                        <div className="mt-2 text-sm text-slate-400">Quản trị nội dung shop</div>
                        {currentUser && (
                            <div className="mt-3 text-xs text-slate-500">
                                Xin chào, <span className="text-slate-300 font-medium">{currentUser.name}</span>
                                <span className="ml-2 rounded bg-red-600/20 px-2 py-0.5 text-red-400 uppercase">
                                    {currentUser.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                                </span>
                            </div>
                        )}
                    </div>

                    <nav className="space-y-1 flex-1">
                        {visibleMenu.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 transition text-sm ${
                                        isActive
                                            ? 'bg-red-600 text-white'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition mt-4"
                    >
                        <LogOut size={18} />
                        <span>Đăng xuất</span>
                    </button>
                </aside>

                <main className="flex-1 p-6 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="banners" element={<AdminBanners />} />
                        <Route path="news" element={<AdminNews />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="settings" element={<AdminSettings />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}