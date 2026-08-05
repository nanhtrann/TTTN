import React, { useEffect, useState } from 'react';
import siteConfigService from '../services/siteConfigService';
import { resolveImageUrl } from '../utils/imageUtils';
import { Save, Upload, Eye, EyeOff } from 'lucide-react';

export default function AdminSettings() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [logoPreview, setLogoPreview] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [message, setMessage] = useState('');

    const fetchConfig = async () => {
        try {
            const data = await siteConfigService.getSiteConfig();
            setConfig(data);
            setLogoPreview(data.logo ? resolveImageUrl(data.logo) : '');
        } catch (error) {
            console.error('Lỗi tải cấu hình:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('primary_color', config.primary_color);
            formData.append('show_new_products', config.show_new_products);
            formData.append('show_best_products', config.show_best_products);
            formData.append('show_sale_products', config.show_sale_products);
            formData.append('show_news', config.show_news);
            if (logoFile) {
                formData.append('logo', logoFile);
            }

            await siteConfigService.updateSiteConfig(formData);
            setMessage('Cập nhật cấu hình giao diện thành công!');
            setLogoFile(null);
            fetchConfig();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Lỗi khi cập nhật cấu hình');
            console.error('Lỗi:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Quản lý giao diện</h1>
                <div className="text-slate-300">Đang tải...</div>
            </div>
        );
    }

    if (!config) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Quản lý giao diện</h1>
                <div className="text-red-400">Không thể tải cấu hình giao diện.</div>
            </div>
        );
    }

    const colorPresets = [
        { name: 'Đỏ', value: '#dc2626' },
        { name: 'Xanh dương', value: '#2563eb' },
        { name: 'Xanh lá', value: '#16a34a' },
        { name: 'Tím', value: '#9333ea' },
        { name: 'Cam', value: '#ea580c' },
        { name: 'Hồng', value: '#db2777' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Quản lý giao diện</h1>

            {message && (
                <div className={`mb-4 rounded-xl border p-4 ${
                    message.includes('thành công')
                        ? 'border-green-500/30 bg-green-500/10 text-green-400'
                        : 'border-red-500/30 bg-red-500/10 text-red-400'
                }`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                {/* Logo */}
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                    <h2 className="text-lg font-bold mb-4">Logo website</h2>
                    <div className="flex items-center gap-6">
                        <div className="flex-shrink-0">
                            {logoPreview ? (
                                <img
                                    src={logoPreview}
                                    alt="Logo"
                                    className="h-20 w-20 rounded-xl object-cover border border-white/10"
                                />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-500">
                                    <Upload size={24} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-slate-300 focus:border-red-500 focus:outline-none"
                            />
                            <p className="mt-2 text-xs text-slate-500">Chọn ảnh logo mới (PNG, JPG, SVG...)</p>
                        </div>
                    </div>
                </div>

                {/* Màu giao diện */}
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                    <h2 className="text-lg font-bold mb-4">Màu giao diện</h2>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            name="primary_color"
                            value={config.primary_color || '#dc2626'}
                            onChange={handleInputChange}
                            className="h-12 w-20 cursor-pointer rounded-lg border border-white/10 bg-slate-800"
                        />
                        <input
                            type="text"
                            name="primary_color"
                            value={config.primary_color || '#dc2626'}
                            onChange={handleInputChange}
                            className="w-32 rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                        />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {colorPresets.map((color) => (
                            <button
                                key={color.value}
                                type="button"
                                onClick={() => setConfig((prev) => ({ ...prev, primary_color: color.value }))}
                                className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-slate-800 transition"
                            >
                                <span
                                    className="h-4 w-4 rounded-full"
                                    style={{ backgroundColor: color.value }}
                                />
                                {color.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hiển thị/Ẩn các mục */}
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                    <h2 className="text-lg font-bold mb-4">Hiển thị / Ẩn các mục trên trang chủ</h2>
                    <div className="space-y-3">
                        {[
                            { key: 'show_new_products', label: 'Sản phẩm mới' },
                            { key: 'show_best_products', label: 'Sản phẩm bán chạy' },
                            { key: 'show_sale_products', label: 'Sản phẩm giảm giá' },
                            { key: 'show_news', label: 'Tin tức' },
                        ].map((item) => (
                            <label
                                key={item.key}
                                className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800 px-4 py-3 cursor-pointer hover:bg-slate-700/50 transition"
                            >
                                <span className="text-sm font-medium">{item.label}</span>
                                <div className="flex items-center gap-3">
                                    {config[item.key] ? (
                                        <span className="flex items-center gap-1 text-xs text-green-400">
                                            <Eye size={14} /> Hiển thị
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-xs text-slate-500">
                                            <EyeOff size={14} /> Đang ẩn
                                        </span>
                                    )}
                                    <input
                                        type="checkbox"
                                        name={item.key}
                                        checked={config[item.key] || false}
                                        onChange={handleInputChange}
                                        className="h-5 w-5 accent-red-600 cursor-pointer"
                                    />
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-3 font-semibold hover:bg-red-500 transition disabled:opacity-50"
                    >
                        <Save size={18} />
                        {submitting ? 'Đang lưu...' : 'Lưu cấu hình'}
                    </button>
                </div>
            </form>
        </div>
    );
}