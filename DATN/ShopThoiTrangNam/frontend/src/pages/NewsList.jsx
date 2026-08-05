import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../services/newsService';
import { resolveImageUrl } from '../utils/imageUtils';

export default function NewsList() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await newsService.getAllNews();
                setNews(data || []);
            } catch (error) {
                console.error('Lỗi tải tin tức:', error);
                setNews([]);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('vi-VN');
    };

    return (
        <div className="bg-[#121212] text-white min-h-screen py-10 px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide text-red-500">Tin tức</h1>
                <p className="text-gray-400 text-sm mb-8">Cập nhật những xu hướng thời trang mới nhất.</p>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Đang tải tin tức...</div>
                ) : news.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">Chưa có bài viết nào.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {news.map((item) => (
                            <Link
                                key={item.id}
                                to={`/news/${item.id}`}
                                className="group rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a] hover:border-red-500 transition"
                            >
                                <div className="h-56 overflow-hidden">
                                    <img src={resolveImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                                <div className="p-5">
                                    <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
                                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition">{item.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-3">{item.content || 'Chưa có nội dung.'}</p>
                                    <span className="inline-block mt-4 text-red-400 text-sm font-medium">Đọc thêm →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
