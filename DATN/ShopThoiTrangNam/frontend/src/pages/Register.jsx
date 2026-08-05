import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authService.register({ name, email, password });
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login'); // Chuyển hướng sang trang đăng nhập
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại!');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Đăng Ký Tài Khoản</h2>
                {error && <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600">Họ tên</label>
                        <input
                            type="text"
                            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                        className="w-full rounded bg-green-600 py-2 text-white font-semibold hover:bg-green-700 transition"
                    >
                        Đăng Ký
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Đã có tài khoản? <Link to="/login" className="text-blue-600 hover:underline">Đăng nhập ngay</Link>
                </p>
            </div>
        </div>
    );
}