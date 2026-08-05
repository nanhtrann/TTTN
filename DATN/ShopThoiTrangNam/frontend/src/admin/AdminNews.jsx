import React, { useEffect, useState } from 'react';
import newsService from '../services/newsService';
import { resolveImageUrl } from '../utils/imageUtils';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyForm = {
    title: '',
    content: '',
    status: 'active',
    image: null,
};

export default function AdminNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchNews = async () => {
        try {
            const data = await newsService.getAllNews();
            setNews(data);
        } catch (error) {
            console.error('Lỗi tải tin tức:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const openCreateModal = () => {
        setForm(emptyForm);
        setImagePreview('');
        setEditingId(null);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setForm({
            title: item.title || '',
            content: item.content || '',
            status: item.status || 'active',
            image: null,
        });
        setImagePreview(item.image ? resolveImageUrl(item.image) : '');
        setEditingId(item.id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm(emptyForm);
        setImagePreview('');
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('content', form.content);
            formData.append('status', form.status);
            if (form.image) {
                formData.append('image', form.image);
            }

            if (editingId) {
                await newsService.updateNews(editingId, formData);
            } else {
                await newsService.createNews(formData);
            }

            closeModal();
            fetchNews();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi lưu tin tức');
            console.error('Lỗi:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) return;
        try {
            await newsService.deleteNews(id);
            fetchNews();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi xóa tin tức');
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Quản lý tin tức</h1>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-semibold hover:bg-red-500 transition"
                >
                    <Plus size={18} /> Thêm mới
                </button>
            </div>

            {loading ? (
                <div className="text-slate-300">Đang tải...</div>
            ) : (
                <div className="space-y-4">
                    {news.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center text-slate-500">
                            Không có bài viết nào.
                        </div>
                    ) : (
                        news.map((item) => (
                            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                                <div className="flex gap-4">
                                    <img
                                        src={resolveImageUrl(item.image)}
                                        alt={item.title}
                                        className="h-24 w-36 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3">
                                            <div className="font-semibold text-lg">{item.title}</div>
                                            <span className={`rounded px-2 py-0.5 text-xs ${
                                                item.status === 'active'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-slate-500/20 text-slate-400'
                                            }`}>
                                                {item.status === 'active' ? 'Hiển thị' : 'Ẩn'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-400 mt-2 line-clamp-2">
                                            {item.content || 'Không có nội dung'}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-2">
                                            Ngày đăng: {formatDate(item.createdAt)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                                            title="Sửa"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="rounded-lg bg-red-600/20 p-2 text-red-400 hover:bg-red-600 hover:text-white transition"
                                            title="Xóa"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{editingId ? 'Sửa tin tức' : 'Thêm tin tức mới'}</h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm text-slate-400">Tiêu đề *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-slate-400">Nội dung *</label>
                                <textarea
                                    name="content"
                                    value={form.content}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-slate-400">Trạng thái</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                >
                                    <option value="active">Hiển thị</option>
                                    <option value="hidden">Ẩn</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-slate-400">Ảnh</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-slate-300 focus:border-red-500 focus:outline-none"
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-36 rounded-xl object-cover" />
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-xl border border-white/10 px-6 py-2 text-slate-300 hover:bg-slate-800 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="rounded-xl bg-red-600 px-6 py-2 font-semibold hover:bg-red-500 transition disabled:opacity-50"
                                >
                                    {submitting ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}