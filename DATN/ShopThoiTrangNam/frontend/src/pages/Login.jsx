import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login({ email, password });
            // Lưu token và thông tin user vào localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('isLoggedIn', 'true');
            alert('Đăng nhập thành công!');
            // Nếu là admin thì chuyển hướng đến trang admin
            if (['superadmin', 'admin'].includes(data.user.role)) {
                navigate('/admin/dashboard');
            } else {
                navigate('/'); // Chuyển hướng về trang chủ
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại!');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Đăng Nhập - Shop Thời Trang Nam</h2>
                {error && <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Đăng Nhập
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Chưa có tài khoản? <Link to="/register" className="text-blue-600 hover:underline">Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}