import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import { resolveImageUrl } from '../utils/imageUtils';
import { X, ShoppingBag, MapPin, Phone, CreditCard, Loader } from 'lucide-react';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        shipping_address: '',
        phone: '',
        payment_method: 'COD',
        full_name: '',
        note: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        // Lấy thông tin user từ localStorage để điền sẵn
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setShippingInfo(prev => ({
                    ...prev,
                    full_name: user.name || '',
                    phone: user.phone || '',
                }));
            } catch {}
        }
    }, []);

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        const updated = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const removeItem = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để thanh toán!');
            navigate('/login');
            return;
        }

        if (!shippingInfo.shipping_address.trim() || !shippingInfo.phone.trim()) {
            alert('Vui lòng nhập đầy đủ địa chỉ giao hàng và số điện thoại!');
            return;
        }

        setSubmitting(true);

        try {
            // Chuẩn bị items theo format backend yêu cầu
            const items = cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: Number(item.price),
                quantity: Number(item.quantity),
            }));

            await orderService.createOrder({
                shipping_address: shippingInfo.shipping_address,
                phone: shippingInfo.phone,
                payment_method: shippingInfo.payment_method,
                items: items,
            });

            localStorage.removeItem('cart');
            setCartItems([]);
            setShowCheckout(false);
            alert('Đặt hàng thành công! Đơn hàng của bạn đã được ghi nhận.');
            navigate('/profile');
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            const errMsg = error.response?.data?.message || 'Đặt hàng thất bại!';
            alert(errMsg);
        } finally {
            setSubmitting(false);
        }
    };

return (
        <div className="min-h-screen bg-gray-50 py-10 dark:bg-[#121212]">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 dark:text-white">
                    <ShoppingBag className="text-blue-600" size={28} />
                    Giỏ Hàng Của Bạn
                </h1>
                
                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center dark:bg-[#1a1a1a] dark:border dark:border-gray-800">
                        <p className="text-gray-600 mb-4 dark:text-gray-300">Giỏ hàng của bạn đang trống.</p>
                        <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden p-6 dark:bg-[#1a1a1a] dark:border dark:border-gray-800">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b py-4 gap-4 dark:border-gray-700">
                                <img src={resolveImageUrl(item.image)} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</h4>
                                    <p className="text-red-600 font-bold text-sm">{item.price?.toLocaleString()} đ</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                    >-</button>
                                    <span className="w-8 text-center font-medium dark:text-gray-200">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                    >+</button>
                                </div>
                                <div className="text-right font-bold text-gray-800 min-w-[100px] dark:text-gray-100">
                                    {(item.price * item.quantity).toLocaleString()} đ
                                </div>
                                <button 
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 font-medium text-sm ml-4"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}

                        <div className="mt-6 flex justify-between items-center pt-4 border-t dark:border-gray-700">
                            <span className="text-lg font-bold text-gray-700 dark:text-gray-200">Tổng thanh toán:</span>
                            <span className="text-2xl font-bold text-red-600">{totalPrice.toLocaleString()} đ</span>
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <Link to="/" className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                                Mua thêm
                            </Link>
                            <button 
                                onClick={() => setShowCheckout(true)}
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
                            >
                                Thanh toán ngay
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal Thanh toán */}
                {showCheckout && cartItems.length > 0 && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 dark:bg-[#1a1a1a] dark:border dark:border-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Thông tin thanh toán</h2>
                                <button 
                                    onClick={() => setShowCheckout(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleCheckout} className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Họ tên người nhận *</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={shippingInfo.full_name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-600 flex items-center gap-1 dark:text-gray-300">
                                        <Phone size={16} /> Số điện thoại *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="0901234567"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-600 flex items-center gap-1 dark:text-gray-300">
                                        <MapPin size={16} /> Địa chỉ giao hàng *
                                    </label>
                                    <textarea
                                        name="shipping_address"
                                        value={shippingInfo.shipping_address}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        placeholder="Số nhà, đường, phường, quận, thành phố..."
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-600 flex items-center gap-1 dark:text-gray-300">
                                        <CreditCard size={16} /> Phương thức thanh toán
                                    </label>
                                    <select
                                        name="payment_method"
                                        value={shippingInfo.payment_method}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    >
                                        <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                                        <option value="Banking">Chuyển khoản ngân hàng</option>
                                    </select>
                                </div>

                                {/* Tóm tắt đơn hàng */}
                                <div className="rounded-lg bg-gray-50 p-4 dark:bg-[#222] dark:border dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-700 mb-2 dark:text-gray-200">Tóm tắt đơn hàng</h3>
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm text-gray-600 py-1 dark:text-gray-300">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>{(item.price * item.quantity).toLocaleString()} đ</span>
                                        </div>
                                    ))}
                                    <div className="border-t mt-2 pt-2 flex justify-between font-bold text-gray-800 dark:border-gray-700 dark:text-white">
                                        <span>Tổng cộng</span>
                                        <span className="text-red-600">{totalPrice.toLocaleString()} đ</span>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowCheckout(false)}
                                        className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader size={18} className="animate-spin" />
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            'Xác nhận đặt hàng'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
