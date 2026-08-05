import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import { resolveImageUrl } from '../utils/imageUtils';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Bộ lọc - lấy giá trị current từ URL để đồng bộ khi đổi category từ Header
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('');

    // Bộ lọc từ các mục "Xem tất cả" trên trang chủ (Sản phẩm mới / bán chạy / giảm giá)
    const [filterType, setFilterType] = useState(searchParams.get('filter') || '');

    // Đồng bộ selectedCategory mỗi khi tham số category trên URL thay đổi
    useEffect(() => {
        setSelectedCategory(searchParams.get('category') || '');
        setFilterType(searchParams.get('filter') || '');
    }, [searchParams]);

    // Khi user đổi category trong dropdown, cập nhật URL để đồng bộ với link từ Header
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('category', value);
        } else {
            params.delete('category');
        }
        setSearchParams(params, { replace: true });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const catData = await categoryService.getAllCategories().catch(() => []);
                setCategories(catData);

                // Xây dựng params
                const params = {};
                if (query.trim()) params.q = query.trim();
                if (selectedCategory) params.category = selectedCategory;
                if (minPrice) params.minPrice = minPrice;
                if (maxPrice) params.maxPrice = maxPrice;
                if (sort) params.sort = sort;
                // Lọc theo loại: is_new / is_best / is_sale
                if (filterType === 'new') params.is_new = 'true';
                if (filterType === 'best') params.is_best = 'true';
                if (filterType === 'sale') params.is_sale = 'true';

                let data;
                if (query.trim()) {
                    data = await productService.searchProducts(query.trim());
                } else {
                    data = await productService.getAllProducts(params);
                }

                // Lọc theo danh mục / giá / sắp xếp phía client (vì searchProducts không hỗ trợ params)
                if (query.trim()) {
                    let filtered = data;
                    if (selectedCategory) {
                        filtered = filtered.filter(item => Number(item.Category?.id) === Number(selectedCategory) || Number(item.category_id) === Number(selectedCategory));
                    }
                    if (minPrice) filtered = filtered.filter(item => Number(item.price) >= Number(minPrice));
                    if (maxPrice) filtered = filtered.filter(item => Number(item.price) <= Number(maxPrice));
                    if (sort === 'price_asc') filtered.sort((a, b) => Number(a.price) - Number(b.price));
                    if (sort === 'price_desc') filtered.sort((a, b) => Number(b.price) - Number(a.price));
                    if (sort === 'name_asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
                    if (sort === 'name_desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
                    data = filtered;
                }

                setResults(data);
            } catch (error) {
                console.error('Lỗi tìm kiếm:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, selectedCategory, minPrice, maxPrice, sort, filterType]);

    const toggleWishlist = (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để sử dụng chức năng yêu thích!');
            navigate('/login');
            return;
        }

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const exists = wishlist.some((item) => Number(item.id) === Number(product.id));

        if (exists) {
            const filtered = wishlist.filter((item) => Number(item.id) !== Number(product.id));
            localStorage.setItem('wishlist', JSON.stringify(filtered));
            alert('Đã xóa khỏi danh sách yêu thích!');
            setResults((current) => current.map((item) => item.id === product.id ? { ...item, isFav: false } : item));
        } else {
            wishlist.push({ ...product });
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert('Đã thêm vào danh sách yêu thích!');
            setResults((current) => current.map((item) => item.id === product.id ? { ...item, isFav: true } : item));
        }
    };

const clearFilters = () => {
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setSort('');
        setFilterType('');
        const params = new URLSearchParams(searchParams);
        params.delete('filter');
        params.delete('category');
        setSearchParams(params, { replace: true });
    };

    const hasFilters = selectedCategory || minPrice || maxPrice || sort;

return (
        <div className="bg-gray-50 text-gray-900 min-h-screen py-10 px-8 dark:bg-[#121212] dark:text-white">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-2">
                    {query ? (
                        <>Kết quả tìm kiếm cho: <span className="text-red-500">"{query}"</span></>
                    ) : (
                        'Tất cả sản phẩm'
                    )}
                </h1>
                <p className="text-gray-400 text-sm mb-8">Tìm thấy {results.length} sản phẩm phù hợp.</p>

                {/* Bộ lọc */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 flex flex-wrap items-center gap-4 dark:bg-[#1a1a1a] dark:border-gray-800">
<div className="flex items-center gap-2 text-gray-400">
                        <SlidersHorizontal />
                        <span className="text-sm font-medium">Lọc:</span>
                    </div>

                    {/* Lọc theo danh mục */}
<select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 dark:bg-[#222] dark:border-gray-700 dark:text-white"
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    {/* Khoảng giá */}
                    <input
                        type="number"
                        placeholder="Giá tối thiểu"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:border-red-500 dark:bg-[#222] dark:border-gray-700 dark:text-white"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Giá tối đa"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:border-red-500 dark:bg-[#222] dark:border-gray-700 dark:text-white"
                    />

                    {/* Sắp xếp */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 dark:bg-[#222] dark:border-gray-700 dark:text-white"
                    >
                        <option value="">Sắp xếp mặc định</option>
                        <option value="price_asc">Giá tăng dần</option>
                        <option value="price_desc">Giá giảm dần</option>
                        <option value="name_asc">Tên A-Z</option>
                        <option value="name_desc">Tên Z-A</option>
                    </select>

                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-red-500 hover:text-red-400 text-sm ml-auto"
                        >
<X /> Xóa lọc
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Đang truy vấn database...</div>
                ) : results.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {results.map((item) => {
                            const isFav = (JSON.parse(localStorage.getItem('wishlist')) || []).some((wish) => Number(wish.id) === Number(item.id));
                            const hasSale = item.sale_price && Number(item.sale_price) > 0 && Number(item.sale_price) < Number(item.price);

                            return (
                                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-red-500 transition relative dark:bg-[#1a1a1a] dark:border-gray-800">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleWishlist(item);
                                        }}
                                        className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-2 shadow hover:scale-105 transition"
                                        title={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} fill={isFav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                    <Link to={`/products/${item.id}`} className="block">
                                        <div className="w-full h-48 bg-gray-800 rounded-md mb-4 overflow-hidden flex items-center justify-center">
                                            <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-xs text-red-400 font-semibold uppercase">{item.Category?.name || 'Sản phẩm'}</span>
                                        <h3 className="font-medium text-gray-900 mt-1 line-clamp-1 dark:text-white">{item.name}</h3>
                                        {hasSale ? (
                                            <div className="mt-2">
                                                <p className="text-red-500 font-bold">{Number(item.sale_price).toLocaleString('vi-VN')} đ</p>
                                                <p className="text-gray-500 text-sm line-through">{Number(item.price).toLocaleString('vi-VN')} đ</p>
                                            </div>
                                        ) : (
                                            <p className="text-red-500 font-bold mt-2">{Number(item.price).toLocaleString('vi-VN')} đ</p>
                                        )}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
