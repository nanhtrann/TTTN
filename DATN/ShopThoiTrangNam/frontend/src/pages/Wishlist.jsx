import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../utils/imageUtils';

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(storedWishlist);
    }, []);

    const removeFromWishlist = (id) => {
        const updated = wishlistItems.filter((item) => Number(item.id) !== Number(id));
        setWishlistItems(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated));
    };

    return (
        <div className="bg-[#121212] text-white min-h-screen py-10 px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-red-500 uppercase tracking-wide">Sản phẩm yêu thích của bạn</h1>
                
                {wishlistItems.length === 0 ? (
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <p className="text-gray-400 text-base mb-6">Chưa có sản phẩm nào trong danh sách yêu thích của bạn.</p>
                        <Link to="/" className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition inline-block">
                            Khám phá sản phẩm ngay
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 hover:border-red-500 transition block">
                                <Link to={`/products/${item.id}`} className="block">
                                    <div className="w-full h-48 bg-gray-800 rounded-md mb-4 overflow-hidden flex items-center justify-center">
                                        <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-medium text-white mt-1 line-clamp-1">{item.name}</h3>
                                    <p className="text-red-500 font-bold mt-2">{Number(item.price).toLocaleString('vi-VN')} đ</p>
                                </Link>
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="mt-3 w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                                >
                                    Bỏ yêu thích
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}