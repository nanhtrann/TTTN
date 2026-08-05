import React, { useEffect, useState } from 'react';
import categoryService from '../services/categoryService';
import { resolveImageUrl } from '../utils/imageUtils';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyForm = {
    name: '',
    description: '',
    status: 'active',
    image: null,
};

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Lỗi tải danh mục:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const openCreateModal = () => {
        setForm(emptyForm);
        setImagePreview('');
        setEditingId(null);
        setShowModal(true);
    };

    const openEditModal = (category) => {
        setForm({
            name: category.name || '',
            description: category.description || '',
            status: category.status || 'active',
            image: null,
        });
        setImagePreview(category.image ? resolveImageUrl(category.image) : '');
        setEditingId(category.id);
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
            formData.append('name', form.name);
            formData.append('description', form.description || '');
            formData.append('status', form.status);
            if (form.image) {
                formData.append('image', form.image);
            }

            if (editingId) {
                await categoryService.updateCategory(editingId, formData);
            } else {
                await categoryService.createCategory(formData);
            }

            closeModal();
            fetchCategories();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi lưu danh mục');
            console.error('Lỗi:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa danh mục này?')) return;
        try {
            await categoryService.deleteCategory(id);
            fetchCategories();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi xóa danh mục');
        }
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Quản lý danh mục</h1>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-white/10 bg-slate-900 p-8 text-center text-slate-500">
                            Không có danh mục nào.
                        </div>
                    ) : (
                        categories.map((item) => (
                            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                                <div className="flex items-start gap-4">
                                    <img
                                        src={resolveImageUrl(item.image)}
                                        alt={item.name}
                                        className="h-16 w-16 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-lg truncate">{item.name}</div>
                                        <div className="text-sm text-slate-400 mt-1 line-clamp-2">
                                            {item.description || 'Không có mô tả'}
                                        </div>
                                        <div className="mt-2">
                                            <span className={`rounded px-2 py-0.5 text-xs ${
                                                item.status === 'active'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-slate-500/20 text-slate-400'
                                            }`}>
                                                {item.status === 'active' ? 'Hiển thị' : 'Ẩn'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
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
                        ))
                    )}
                </div>
            )}

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{editingId ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm text-slate-400">Tên danh mục *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-slate-400">Mô tả</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleInputChange}
                                    rows={3}
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
                                <label className="mb-1 block text-sm text-slate-400">Hình ảnh</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-slate-300 focus:border-red-500 focus:outline-none"
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-24 rounded-xl object-cover" />
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