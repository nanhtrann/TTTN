import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import { resolveImageUrl } from '../utils/imageUtils';
import { Trash2, X, Eye } from 'lucide-react';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Lỗi tải đơn hàng admin:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await orderService.updateOrderStatus(id, newStatus);
            fetchOrders();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;
        try {
            await orderService.deleteOrder(id);
            fetchOrders();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi xóa đơn hàng');
        }
    };

    const viewDetail = async (id) => {
        setShowDetailModal(true);
        setDetailLoading(true);
        try {
            const data = await orderService.getOrderById(id);
            setSelectedOrder(data);
        } catch (error) {
            console.error('Lỗi tải chi tiết đơn hàng:', error);
        } finally {
            setDetailLoading(false);
        }
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
        setSelectedOrder(null);
    };

    const statusOptions = [
        { value: 'Pending', label: 'Chờ xử lý', color: 'bg-yellow-500/20 text-yellow-400' },
        { value: 'Shipping', label: 'Đang giao', color: 'bg-blue-500/20 text-blue-400' },
        { value: 'Completed', label: 'Hoàn thành', color: 'bg-green-500/20 text-green-400' },
        { value: 'Cancelled', label: 'Đã hủy', color: 'bg-red-500/20 text-red-400' },
    ];

    const getStatusBadge = (status) => {
        const opt = statusOptions.find((s) => s.value === status);
        return opt ? opt : { label: status, color: 'bg-slate-500/20 text-slate-400' };
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleString('vi-VN');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>

            {loading ? (
                <div className="text-slate-300">Đang tải...</div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-slate-400">
                            <tr>
                                <th className="p-4">Mã đơn</th>
                                <th className="p-4">Khách hàng</th>
                                <th className="p-4">Tổng tiền</th>
                                <th className="p-4">Trạng thái</th>
                                <th className="p-4">Ngày đặt</th>
                                <th className="p-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">Chưa có đơn hàng nào.</td>
                                </tr>
                            ) : (
                                orders.map((order) => {
                                    const statusBadge = getStatusBadge(order.status);
                                    return (
                                        <tr key={order.id} className="border-b border-white/5 hover:bg-slate-800/50">
                                            <td className="p-4 font-medium">#{order.id}</td>
                                            <td className="p-4">
                                                <div className="text-slate-300">{order.User?.name || 'N/A'}</div>
                                                <div className="text-xs text-slate-500">{order.User?.email || ''}</div>
                                            </td>
                                            <td className="p-4 text-red-400 font-semibold">
                                                {Number(order.total_price || 0).toLocaleString('vi-VN')} đ
                                            </td>
<td className="p-4">
                                                {['Completed', 'Cancelled'].includes(order.status) ? (
                                                    <span className={`inline-block rounded-lg px-3 py-1.5 text-xs font-medium ${statusBadge.color}`}>
                                                        {statusBadge.label}
                                                    </span>
                                                ) : (
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className={`rounded-lg border-0 px-3 py-1.5 text-xs font-medium cursor-pointer ${statusBadge.color}`}
                                                    >
                                                        {statusOptions.map((opt) => (
                                                            <option key={opt.value} value={opt.value} className="bg-slate-800 text-white">
                                                                {opt.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            </td>
                                            <td className="p-4 text-slate-400 text-xs">{formatDate(order.createdAt)}</td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => viewDetail(order.id)}
                                                        className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                                                        title="Xem chi tiết"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(order.id)}
                                                        className="rounded-lg bg-red-600/20 p-2 text-red-400 hover:bg-red-600 hover:text-white transition"
                                                        title="Xóa"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Chi tiết đơn hàng</h2>
                            <button onClick={closeDetailModal} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        {detailLoading ? (
                            <div className="text-slate-300">Đang tải...</div>
                        ) : selectedOrder ? (
                            <div className="space-y-4">
                                {/* Thông tin chung */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
                                        <div className="text-xs text-slate-500">Mã đơn hàng</div>
                                        <div className="font-bold mt-1">#{selectedOrder.id}</div>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
                                        <div className="text-xs text-slate-500">Trạng thái</div>
                                        <div className={`mt-1 inline-block rounded px-2 py-0.5 text-xs ${getStatusBadge(selectedOrder.status).color}`}>
                                            {getStatusBadge(selectedOrder.status).label}
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
                                        <div className="text-xs text-slate-500">Khách hàng</div>
                                        <div className="font-medium mt-1">{selectedOrder.User?.name || 'N/A'}</div>
                                        <div className="text-xs text-slate-400">{selectedOrder.User?.email || ''}</div>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
                                        <div className="text-xs text-slate-500">Ngày đặt</div>
                                        <div className="text-sm mt-1">{formatDate(selectedOrder.createdAt)}</div>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
                                        <div className="text-xs text-slate-500">Số điện thoại</div>
                                        <div className="text-sm mt-1">{selectedOrder.phone}</div>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
                                        <div className="text-xs text-slate-500">Phương thức thanh toán</div>
                                        <div className="text-sm mt-1">{selectedOrder.payment_method || 'COD'}</div>
                                    </div>
                                </div>

                                {/* Địa chỉ giao hàng */}
                                <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
                                    <div className="text-xs text-slate-500">Địa chỉ giao hàng</div>
                                    <div className="text-sm mt-1">{selectedOrder.shipping_address}</div>
                                </div>

                                {/* Danh sách sản phẩm */}
                                <div>
                                    <h3 className="text-sm font-bold mb-2">Sản phẩm</h3>
                                    <div className="space-y-2">
                                        {selectedOrder.OrderDetails && selectedOrder.OrderDetails.length > 0 ? (
                                            selectedOrder.OrderDetails.map((detail, idx) => (
                                                <div key={idx} className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800 p-3">
                                                    <img
                                                        src={resolveImageUrl(detail.Product?.image)}
                                                        alt={detail.Product?.name}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium">{detail.Product?.name || 'Sản phẩm'}</div>
                                                        <div className="text-xs text-slate-400">
                                                            SL: {detail.quantity} x {Number(detail.price).toLocaleString('vi-VN')} đ
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold text-red-400">
                                                        {Number(detail.price * detail.quantity).toLocaleString('vi-VN')} đ
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-slate-500 text-sm">Không có chi tiết sản phẩm.</div>
                                        )}
                                    </div>
                                </div>

                                {/* Tổng tiền */}
                                <div className="flex justify-between rounded-xl border border-white/10 bg-slate-800 p-4">
                                    <span className="font-bold">Tổng tiền</span>
                                    <span className="font-bold text-red-400 text-lg">
                                        {Number(selectedOrder.total_price || 0).toLocaleString('vi-VN')} đ
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-400">Không có dữ liệu.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}