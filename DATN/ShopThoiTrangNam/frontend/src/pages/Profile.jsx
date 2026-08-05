import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';
import orderService from '../services/orderService';
import { resolveImageUrl } from '../utils/imageUtils';
import { getCurrentUser } from '../utils/adminAuth';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const [profileResponse, orderResponse] = await Promise.all([
                    axiosClient.get('/profile'),
                    orderService.getMyOrders()
                ]);

                setUser(profileResponse.data);
                setOrders(orderResponse);
            } catch (error) {
                console.error('Lỗi khi tải thông tin tài khoản:', error);
                // Fallback: use localStorage user if API fails
                const localUser = getCurrentUser();
                if (localUser) setUser(localUser);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const statusLabels = {
        Pending: { label: 'Chờ xử lý', color: 'bg-yellow-500/20 text-yellow-400' },
        Shipping: { label: 'Đang giao', color: 'bg-blue-500/20 text-blue-400' },
        Completed: { label: 'Hoàn thành', color: 'bg-green-500/20 text-green-400' },
        Cancelled: { label: 'Đã hủy', color: 'bg-red-500/20 text-red-400' },
    };

    const getStatus = (status) => statusLabels[status] || { label: status, color: 'bg-gray-500/20 text-gray-400' };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleString('vi-VN');
    };

if (loading) return <div className="bg-gray-50 text-white min-h-screen p-10 text-center dark:bg-[#121212]">Đang tải thông tin...</div>;

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen py-10 px-4 dark:bg-[#121212] dark:text-white">
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-lg dark:bg-[#1a1a1a] dark:border-gray-800">
                <div className="flex items-center space-x-6 border-b border-gray-200 pb-6 dark:border-gray-800">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-3xl font-bold uppercase text-white">
                        {user?.name ? user.name.charAt(0) : 'H'}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold uppercase text-red-500">{user?.name || 'Khách hàng'}</h1>
                        <p className="text-gray-500 text-sm dark:text-gray-400">Email: {user?.email || 'Chưa cập nhật'}</p>
                        {user?.role && (
                            <span className={`mt-2 inline-block rounded px-2 py-0.5 text-xs uppercase ${
                                user.role === 'superadmin' ? 'bg-red-500/20 text-red-400' :
                                user.role === 'admin' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-gray-500/20 text-gray-400'
                            }`}>
                                {user.role === 'superadmin' ? 'Super Admin' : user.role === 'admin' ? 'Admin' : 'User'}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-red-400">Đơn hàng của bạn ({orders.length})</h3>
                    {orders.length === 0 ? (
                        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 text-center dark:bg-gray-900/50 dark:border-gray-800">
                            <p className="text-gray-500 text-sm dark:text-gray-400">Bạn chưa có đơn hàng nào.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => {
                                const status = getStatus(order.status);
                                return (
                                    <div key={order.id} className="bg-gray-100 rounded-lg border border-gray-200 p-4 dark:bg-gray-900/50 dark:border-gray-800">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">Đơn hàng #{order.id}</span>
                                                <span className={`rounded px-2 py-0.5 text-xs ${status.color}`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500">{formatDate(order.createdAt)}</span>
                                        </div>

                                        {/* Danh sách sản phẩm */}
                                        {order.OrderDetails && order.OrderDetails.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                                {order.OrderDetails.map((detail, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-2 dark:bg-black/20">
                                                        <img
                                                            src={resolveImageUrl(detail.Product?.image)}
                                                            alt={detail.Product?.name}
                                                            className="h-10 w-10 rounded object-cover"
                                                        />
                                                        <div className="flex-1 text-sm">
                                                            <span className="text-gray-700 dark:text-gray-300">{detail.Product?.name || 'Sản phẩm'}</span>
                                                            <span className="text-gray-500 ml-2">x {detail.quantity}</span>
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {Number(detail.price).toLocaleString('vi-VN')} đ
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                <span>Địa chỉ: {order.shipping_address}</span>
                                                <span className="mx-2">|</span>
                                                <span>ĐT: {order.phone}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-gray-500 mr-2">Tổng:</span>
                                                <span className="font-bold text-red-400">
                                                    {Number(order.total_price).toLocaleString('vi-VN')} đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end dark:border-gray-800">
                    <button 
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition cursor-pointer"
                    >
                        Đăng xuất tài khoản
                    </button>
                </div>
            </div>
        </div>
    );
}
