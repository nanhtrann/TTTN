import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-100 pt-16 pb-8 border-t border-gray-200 text-gray-600 dark:bg-[#141414] dark:border-gray-800 dark:text-gray-400">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h4 className="font-bold text-gray-800 mb-4 uppercase dark:text-gray-200">Về Chúng Tôi</h4>
<ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Giới thiệu</a></li>
                        <li><a href="#" className="hover:underline">Hệ thống cửa hàng</a></li>
                        <li><a href="#" className="hover:underline">Tuyển dụng</a></li>
                        <li><Link to="/news" className="hover:underline">Tin tức</Link></li>
                    </ul>
                </div>
<div>
                    <h4 className="font-bold text-gray-800 mb-4 uppercase dark:text-gray-200">Hỗ Trợ Khách Hàng</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Chính sách đổi trả</a></li>
                        <li><a href="#" className="hover:underline">Chính sách bảo mật</a></li>
                        <li><a href="#" className="hover:underline">Hướng dẫn mua hàng</a></li>
                    </ul>
                </div>
<div>
                    <h4 className="font-bold text-gray-800 mb-4 uppercase dark:text-gray-200">Kết Nối</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Facebook</a></li>
                        <li><a href="#" className="hover:underline">Instagram</a></li>
                        <li><a href="#" className="hover:underline">TikTok</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-4 uppercase dark:text-gray-200">Đăng ký nhận tin</h4>
                    <p className="text-sm mb-4">Nhận thông tin về các bộ sưu tập và ưu đãi mới nhất.</p>
                    <div className="flex">
                        <input type="email" placeholder="Email của bạn..." className="px-4 py-2 border border-gray-300 w-full focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                        <button className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700 uppercase font-medium dark:bg-gray-700 dark:hover:bg-gray-600">Gửi</button>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs border-t border-gray-300 pt-8 dark:border-gray-800">
                &copy; 2026 Bản quyền thuộc về Shop Thời Trang Nam.
            </div>
        </footer>
    );
}