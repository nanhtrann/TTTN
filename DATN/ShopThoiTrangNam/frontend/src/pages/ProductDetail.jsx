import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productService from '../services/productService';
import { resolveImageUrl } from '../utils/imageUtils';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);

                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                setIsFav(wishlist.some((item) => Number(item.id) === Number(data.id)));

                // Lấy sản phẩm liên quan (cùng danh mục)
                if (data.category_id) {
                    const all = await productService.getAllProducts({ category: data.category_id });
                    const related = all.filter((item) => Number(item.id) !== Number(data.id)).slice(0, 4);
                    setRelatedProducts(related);
                }
            } catch (error) {
                console.error('Lỗi khi tải chi tiết sản phẩm:', error);
            }
        };
        fetchProductDetail();
    }, [id]);

    const requireLogin = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để thực hiện thao tác này!');
            navigate('/login');
            return false;
        }
        return true;
    };

    const handleAddToCart = () => {
        if (!requireLogin()) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
        navigate('/cart');
    };

    const handleBuyNow = () => {
        if (!requireLogin()) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/cart');
    };

    const handleToggleWishlist = () => {
        if (!requireLogin()) return;

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const exists = wishlist.some((item) => Number(item.id) === Number(product.id));

        if (exists) {
            const filtered = wishlist.filter((item) => Number(item.id) !== Number(product.id));
            localStorage.setItem('wishlist', JSON.stringify(filtered));
            setIsFav(false);
            alert('Đã xóa sản phẩm khỏi danh sách yêu thích!');
        } else {
            wishlist.push({ ...product });
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setIsFav(true);
            alert('Đã thêm sản phẩm vào danh sách yêu thích!');
        }
    };

    if (!product) {
        return <div className="text-center py-20">Đang tải thông tin sản phẩm...</div>;
    }

    const hasSale = product.sale_price && Number(product.sale_price) > 0 && Number(product.sale_price) < Number(product.price);
    const inStock = Number(product.quantity) > 0;

return (
        <div className="min-h-screen bg-gray-50 py-10 dark:bg-[#121212]">
            <div className="container mx-auto px-4 max-w-5xl">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-600 hover:underline text-sm font-medium"
                >
                    &larr; Quay lại
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6 dark:bg-[#1a1a1a] dark:border dark:border-gray-800">
                    <div className="relative">
                        <img
                            src={resolveImageUrl(product.image)}
                            alt={product.name}
                            className="w-full h-80 md:h-[400px] object-cover rounded-lg shadow-sm"
                        />
                        <button
                            onClick={handleToggleWishlist}
                            className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow hover:scale-105 transition"
                            title={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} fill={isFav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>

<div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2 dark:text-white">{product.name}</h1>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium uppercase dark:bg-blue-900/40 dark:text-blue-300">
                            Danh mục: {product.Category?.name || 'Sản phẩm'}
                        </span>

                        {hasSale ? (
                            <div className="mt-4 mb-4">
                                <p className="text-3xl text-red-600 font-bold">{Number(product.sale_price).toLocaleString()} đ</p>
                                <p className="text-gray-400 line-through">{Number(product.price).toLocaleString()} đ</p>
                            </div>
                        ) : (
                            <p className="text-2xl text-red-600 font-bold mt-4 mb-4">{product.price?.toLocaleString()} đ</p>
                        )}

                        <p className="text-gray-600 mb-6 dark:text-gray-300">{product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}</p>

                        {/* Thông tin sản phẩm */}
                        <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 mb-6 dark:bg-[#222] dark:border-gray-700">
                            <h3 className="font-semibold text-gray-700 mb-3 dark:text-gray-200">Thông tin sản phẩm</h3>
                            <table className="w-full text-sm">
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="py-2 text-gray-500 w-1/3">Mã sản phẩm</td>
                                        <td className="py-2 font-medium">#{product.id}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="py-2 text-gray-500">Danh mục</td>
                                        <td className="py-2 font-medium">{product.Category?.name || 'N/A'}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="py-2 text-gray-500">Tình trạng</td>
                                        <td className="py-2 font-medium">
                                            <span className={`px-2 py-0.5 rounded text-xs ${inStock ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>
                                                {inStock ? 'Còn hàng' : 'Hết hàng'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 text-gray-500">Số lượng trong kho</td>
                                        <td className="py-2 font-medium">{product.quantity}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-gray-700 font-medium dark:text-gray-200">Số lượng:</span>
                            <input
                                type="number"
                                min="1"
                                max={product.quantity || 1}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-16 border rounded px-2 py-1 text-center dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={!inStock}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={!inStock}
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>

{/* Sản phẩm liên quan */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 dark:text-white">Sản phẩm liên quan</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map((item) => {
                                const itemHasSale = item.sale_price && Number(item.sale_price) > 0 && Number(item.sale_price) < Number(item.price);
                                return (
                                    <Link key={item.id} to={`/products/${item.id}`} className="bg-white rounded-lg shadow hover:shadow-md transition p-3 dark:bg-[#1a1a1a] dark:border dark:border-gray-800">
                                        <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                                        <h3 className="font-medium text-gray-800 text-sm line-clamp-1 dark:text-gray-100">{item.name}</h3>
                                        {itemHasSale ? (
                                            <div>
                                                <p className="text-red-600 font-bold text-sm mt-1">{Number(item.sale_price).toLocaleString()} đ</p>
                                                <p className="text-gray-400 text-xs line-through">{Number(item.price).toLocaleString()} đ</p>
                                            </div>
                                        ) : (
                                            <p className="text-red-600 font-bold text-sm mt-1">{Number(item.price).toLocaleString()} đ</p>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
