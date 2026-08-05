import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import { resolveImageUrl } from '../utils/imageUtils';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';

const emptyForm = {
    name: '',
    category_id: '',
    price: '',
    sale_price: '',
    quantity: '',
    description: '',
    is_new: false,
    is_sale: false,
    is_best: false,
    image: null,
};

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [imagePreview, setImagePreview] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchData = async () => {
        try {
            const [productsData, categoriesData] = await Promise.all([
                productService.getAllProducts(),
                categoryService.getAllCategories(),
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Lỗi tải dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openCreateModal = () => {
        setForm(emptyForm);
        setImagePreview('');
        setEditingId(null);
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setForm({
            name: product.name || '',
            category_id: product.category_id || '',
            price: product.price || '',
            sale_price: product.sale_price || '',
            quantity: product.quantity || '',
            description: product.description || '',
            is_new: product.is_new || false,
            is_sale: product.is_sale || false,
            is_best: product.is_best || false,
            image: null,
        });
        setImagePreview(product.image ? resolveImageUrl(product.image) : '');
        setEditingId(product.id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm(emptyForm);
        setImagePreview('');
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
            formData.append('category_id', form.category_id);
            formData.append('price', form.price);
            formData.append('sale_price', form.sale_price || 0);
            formData.append('quantity', form.quantity || 0);
            formData.append('description', form.description || '');
            formData.append('is_new', form.is_new);
            formData.append('is_sale', form.is_sale);
            formData.append('is_best', form.is_best);
            if (form.image) {
                formData.append('image', form.image);
            }

            if (editingId) {
                await productService.updateProduct(editingId, formData);
            } else {
                await productService.createProduct(formData);
            }

            closeModal();
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi lưu sản phẩm');
            console.error('Lỗi:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
        try {
            await productService.deleteProduct(id);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi xóa sản phẩm');
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryName = (id) => {
        const cat = categories.find((c) => c.id === id);
        return cat ? cat.name : 'Chưa phân loại';
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-semibold hover:bg-red-500 transition"
                >
                    <Plus size={18} /> Thêm mới
                </button>
            </div>

            {/* Search */}
            <div className="mb-4 relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                />
            </div>

            {loading ? (
                <div className="text-slate-300">Đang tải...</div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-slate-400">
                            <tr>
                                <th className="p-4">Hình ảnh</th>
                                <th className="p-4">Tên sản phẩm</th>
                                <th className="p-4">Danh mục</th>
                                <th className="p-4">Giá</th>
                                <th className="p-4">Giá KM</th>
                                <th className="p-4">SL</th>
                                <th className="p-4">Tags</th>
                                <th className="p-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="p-8 text-center text-slate-500">Không có sản phẩm nào.</td>
                                </tr>
                            ) : (
                                filteredProducts.map((item) => (
                                    <tr key={item.id} className="border-b border-white/5 hover:bg-slate-800/50">
                                        <td className="p-4">
                                            <img src={resolveImageUrl(item.image)} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                                        </td>
                                        <td className="p-4 font-medium">{item.name}</td>
                                        <td className="p-4 text-slate-400">{getCategoryName(item.category_id)}</td>
                                        <td className="p-4 text-red-400 font-semibold">{Number(item.price || 0).toLocaleString('vi-VN')} đ</td>
                                        <td className="p-4 text-slate-400">
                                            {item.sale_price ? `${Number(item.sale_price).toLocaleString('vi-VN')} đ` : '-'}
                                        </td>
                                        <td className="p-4">{item.quantity || 0}</td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {item.is_new && <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">Mới</span>}
                                                {item.is_best && <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Bán chạy</span>}
                                                {item.is_sale && <span className="rounded bg-orange-500/20 px-2 py-0.5 text-xs text-orange-400">Giảm giá</span>}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
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
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm text-slate-400">Tên sản phẩm *</label>
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
                                    <label className="mb-1 block text-sm text-slate-400">Danh mục *</label>
                                    <select
                                        name="category_id"
                                        value={form.category_id}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm text-slate-400">Giá (đ) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-slate-400">Giá khuyến mãi (đ)</label>
                                    <input
                                        type="number"
                                        name="sale_price"
                                        value={form.sale_price}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-slate-400">Số lượng</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                    />
                                </div>
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
                                <label className="mb-1 block text-sm text-slate-400">Hình ảnh</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-slate-300 focus:border-red-500 focus:outline-none"
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 rounded-xl object-cover" />
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" name="is_new" checked={form.is_new} onChange={handleInputChange} className="h-4 w-4 accent-red-600" />
                                    <span className="text-sm">Sản phẩm mới</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" name="is_best" checked={form.is_best} onChange={handleInputChange} className="h-4 w-4 accent-red-600" />
                                    <span className="text-sm">Sản phẩm bán chạy</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" name="is_sale" checked={form.is_sale} onChange={handleInputChange} className="h-4 w-4 accent-red-600" />
                                    <span className="text-sm">Sản phẩm giảm giá</span>
                                </label>
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