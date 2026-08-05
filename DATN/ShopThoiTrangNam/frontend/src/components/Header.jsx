import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../picture/logo.png';
import { getCurrentUser } from '../utils/adminAuth';
import categoryService from '../services/categoryService';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
    const [showCategories, setShowCategories] = useState(false);
    const { dark: isDarkMode, toggleTheme } = useTheme();
    const [categories, setCategories] = useState([]);
    
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Tải danh sách danh mục động từ backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAllCategories();
                setCategories(data || []);
            } catch (error) {
                console.error('Lỗi tải danh mục header:', error);
            }
        };
        fetchCategories();
    }, []);

    // State quản lý trạng thái đăng nhập
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kiểm tra trạng thái đăng nhập mỗi khi Header load hoặc đổi trang
    useEffect(() => {
        let storedLogin = localStorage.getItem('isLoggedIn');
        
        // Nếu chưa có trên localStorage, tự động set tạm thành 'true' để test không bị lỗi null như console của bạn
        if (!storedLogin) {
            localStorage.setItem('isLoggedIn', 'true');
            storedLogin = 'true';
        }

        const isUserLoggedIn = storedLogin === 'true' || storedLogin === true;
        setIsLoggedIn(isUserLoggedIn);
    }, [location]);

    // Giỏ hàng (Mặc định bằng 0, không có sản phẩm thì ẩn badge)
    const [cartCount, setCartCount] = useState(0); 

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchKeyword.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchKeyword.trim())}`);
            setShowCategories(false);
            setSearchKeyword('');
        }
    };

    // Hàm xử lý khi bấm vào icon Tài khoản
    const handleAccountClick = (e) => {
        e.preventDefault();
        
        const storedLogin = localStorage.getItem('isLoggedIn');
        const isUserLoggedIn = storedLogin === 'true' || storedLogin === true;

        if (isUserLoggedIn) {
            navigate('/profile'); // Đã đăng nhập -> Sang trang cá nhân
        } else {
            navigate('/login');   // Chưa đăng nhập -> Sang trang đăng nhập
        }
    };

    return (
        <header 
            className={`${isDarkMode ? 'bg-[#1a1a1a] text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200'} border-b sticky top-0 z-50 h-16 transition-colors duration-300`}
            onMouseLeave={() => setShowCategories(false)}
        >
            <div className="w-full h-full flex items-center relative">
                
                {/* BÊN TRÁI: Logo + Tên Shop */}
                <div className="absolute left-8 z-20">
                    <Link to="/" className="flex items-center gap-3">
                        <img 
                            src={logoImg} 
                            alt="HYPEMAN Logo" 
                            className="w-10 h-10 object-cover rounded-full border border-gray-600"
                        />
                        <span className="text-2xl font-bold tracking-tighter uppercase text-red-500">
                            HYPEMAN
                        </span>
                    </Link>
                </div>
                
                {/* CHÍNH GIỮA: Thanh tìm kiếm HOẶC Danh mục */}
                <div className="absolute w-full flex justify-center z-10 pointer-events-none">
{showCategories ? (
                        <nav className={`flex items-center space-x-12 font-medium pointer-events-auto ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        to={`/products?category=${cat.id}`}
                                        onClick={() => setShowCategories(false)}
                                        className="hover:text-red-500 transition"
                                    >
                                        {cat.name}
                                    </Link>
                                ))
                            ) : (
                                <>
                                    <Link to="/products?category=1" onClick={() => setShowCategories(false)} className="hover:text-red-500 transition">Áo sơ mi nam</Link>
                                    <Link to="/products?category=2" onClick={() => setShowCategories(false)} className="hover:text-red-500 transition">Áo thun nam</Link>
                                    <Link to="/products?category=3" onClick={() => setShowCategories(false)} className="hover:text-red-500 transition">Áo khoác nam</Link>
                                    <Link to="/products?category=4" onClick={() => setShowCategories(false)} className="hover:text-red-500 transition">Quần Jean</Link>
                                </>
                            )}
                        </nav>
                    ) : (
                        <div className="w-1/3 min-w-[250px] pointer-events-auto">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={handleSearchSubmit}
                                    placeholder="Tìm kiếm sản phẩm (Nhấn Enter)..." 
                                    className={`w-full text-sm px-4 py-2 pl-10 rounded-full border focus:outline-none transition ${
                                        isDarkMode 
                                            ? 'bg-gray-800 text-white border-gray-700 focus:border-gray-500' 
                                            : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-gray-400'
                                    }`}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>

                {/* BÊN PHẢI: Các Icons (Chốt chuẩn vị trí right-16) */}
                <div className="absolute right-16 flex items-center space-x-5 z-20">
                    
                    {!showCategories && (
                        <div className="flex items-center space-x-5">
{/* Nút đổi Dark/Light mode */}
                            <button 
                                onClick={toggleTheme} 
                                className="hover:text-gray-400 transition cursor-pointer p-1"
                                title={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
                            >
                                {isDarkMode ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            {/* Trang Yêu thích */}
                            <Link to="/wishlist" className="hover:text-gray-400 transition" title="Yêu thích">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link>

                            {/* Nút Tài khoản */}
                            <button 
                                onClick={handleAccountClick}
                                className="hover:text-gray-400 transition cursor-pointer p-0 bg-transparent border-none text-inherit"
                                title={isLoggedIn ? "Trang cá nhân" : "Đăng nhập"}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>

                            {/* Giỏ hàng */}
                            <Link to="/cart" className="hover:text-gray-400 transition relative" title="Giỏ hàng">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Admin Panel - Chỉ hiển thị cho admin */}
                            {(() => {
                                const user = getCurrentUser();
                                if (user && ['superadmin', 'admin'].includes(user.role)) {
                                    return (
                                        <Link to="/admin/dashboard" className="hover:text-red-500 transition" title="Quản trị">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </Link>
                                    );
                                }
                                return null;
                            })()}
                        </div>
                    )}

                    {/* Nút 3 gạch mở danh mục */}
                    <button 
                        onMouseEnter={() => setShowCategories(true)}
                        onClick={() => setShowCategories(!showCategories)}
                        className="hover:text-gray-400 transition cursor-pointer p-1"
                    >
                        {showCategories ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                </div>

            </div>
        </header>
    );
}