import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import { getCurrentUser, isSuperAdmin } from '../utils/adminAuth';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';

const emptyForm = {
    name: '',
    email: '',
    password: '',
    role: 'user',
};

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const currentUser = getCurrentUser();

    const fetchUsers = async () => {
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Lỗi tải người dùng:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openCreateModal = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setForm({
            name: user.name || '',
            email: user.email || '',
            password: '',
            role: user.role || 'user',
        });
        setEditingId(user.id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = { ...form };
            // Khi edit, không gửi password nếu để trống
            if (editingId && !data.password) {
                delete data.password;
            }

            if (editingId) {
                await userService.updateUser(editingId, data);
            } else {
                await userService.createUser(data);
            }

            closeModal();
            fetchUsers();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi lưu người dùng');
            console.error('Lỗi:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
        try {
            await userService.deleteUser(id);
            fetchUsers();
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi xóa người dùng');
        }
    };

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const roleBadge = (role) => {
        const styles = {
            superadmin: 'bg-red-500/20 text-red-400',
            admin: 'bg-blue-500/20 text-blue-400',
            user: 'bg-slate-500/20 text-slate-400',
        };
        const labels = {
            superadmin: 'Super Admin',
            admin: 'Admin',
            user: 'User',
        };
        return (
            <span className={`rounded px-2 py-0.5 text-xs uppercase ${styles[role] || styles.user}`}>
                {labels[role] || role}
            </span>
        );
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
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
                    placeholder="Tìm theo tên hoặc email..."
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
                                <th className="p-4">ID</th>
                                <th className="p-4">Họ tên</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Vai trò</th>
                                <th className="p-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">Không có người dùng nào.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-white/5 hover:bg-slate-800/50">
                                        <td className="p-4 text-slate-500">#{user.id}</td>
                                        <td className="p-4 font-medium">
                                            {user.name}
                                            {user.id === currentUser?.id && (
                                                <span className="ml-2 text-xs text-slate-500">(Bạn)</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-slate-400">{user.email}</td>
                                        <td className="p-4">{roleBadge(user.role)}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                                                    title="Sửa"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    disabled={user.id === currentUser?.id}
                                                    className="rounded-lg bg-red-600/20 p-2 text-red-400 hover:bg-red-600 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
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
                    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{editingId ? 'Sửa người dùng' : 'Thêm người dùng mới'}</h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm text-slate-400">Họ tên *</label>
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
                                <label className="mb-1 block text-sm text-slate-400">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-slate-400">
                                    Mật khẩu {editingId ? '(để trống nếu không đổi)' : '*'}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleInputChange}
                                    required={!editingId}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-slate-400">Vai trò</label>
                                <select
                                    name="role"
                                    value={form.role}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    {isSuperAdmin() && <option value="superadmin">Super Admin</option>}
                                </select>
                                {!isSuperAdmin() && (
                                    <p className="mt-1 text-xs text-slate-500">Chỉ Super Admin mới có thể gán quyền Super Admin.</p>
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