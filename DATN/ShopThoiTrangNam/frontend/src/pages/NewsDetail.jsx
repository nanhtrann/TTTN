import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import newsService from '../services/newsService';
import { resolveImageUrl } from '../utils/imageUtils';

export default function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await newsService.getNewsById(id);
                setArticle(data);
            } catch (error) {
                console.error('Lỗi tải chi tiết bài viết:', error);
                setArticle(null);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleString('vi-VN');
    };

    if (loading) {
        return <div className="bg-[#121212] text-white min-h-screen py-20 text-center">Đang tải bài viết...</div>;
    }

    if (!article) {
        return (
            <div className="bg-[#121212] text-white min-h-screen py-20 text-center">
                <p className="mb-6">Không tìm thấy bài viết hoặc bài viết đã bị xóa.</p>
                <Link to="/news" className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">Quay lại danh sách tin tức</Link>
            </div>
        );
    }

    return (
        <div className="bg-[#121212] text-white min-h-screen py-10 px-8">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="mb-6 text-blue-400 hover:underline text-sm font-medium">
                    &larr; Quay lại
                </button>

                <span className="text-xs text-gray-500">{formatDate(article.createdAt)}</span>
                <h1 className="text-3xl font-bold my-4 leading-tight">{article.title}</h1>

                <div className="rounded-2xl overflow-hidden border border-white/10 mb-6">
                    <img src={resolveImageUrl(article.image)} alt={article.title} className="w-full h-80 object-cover" />
                </div>

                <div className="text-gray-300 leading-8 text-base whitespace-pre-line">
                    {article.content || 'Chưa có nội dung.'}
                </div>

                <Link to="/news" className="inline-block mt-8 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
                    Xem thêm tin tức
                </Link>
            </div>
        </div>
    );
}
