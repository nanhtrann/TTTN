import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import newsService from '../services/newsService';
import bannerService from '../services/bannerService';
import { resolveImageUrl } from '../utils/imageUtils';

const fallbackHeroImage = '/uploads/banners/banner-hero.jpg';

const fallbackNews = [
    {
        id: 1,
        title: 'Xu hướng thời trang nam 2026: tối giản nhưng có điểm nhấn',
        content: 'Các bộ suit oversize, áo khoác nylon và quần jean washed blue đang chiếm trọn tâm điểm mùa mới.',
        image: fallbackHeroImage,
    },
    {
        id: 2,
        title: 'Cách phối outfit công sở với áo sơ mi nam thanh lịch',
        content: 'Phối áo sơ mi với quần jean slim và sneaker trắng để tạo phong cách smart casual tối ưu.',
        image: fallbackHeroImage,
    },
    {
        id: 3,
        title: 'Mẹo chọn áo thun nam mặc đi làm và đi chơi',
        content: 'Đừng chỉ chọn theo màu, hãy ưu tiên chất vải mềm, form vừa và dễ mix-and-match.',
        image: fallbackHeroImage,
    },
];

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [news, setNews] = useState(fallbackNews);
    const [heroBanner, setHeroBanner] = useState(null);
    const [newProducts, setNewProducts] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);
    const [saleProducts, setSaleProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodData, catData, newsData, bannerData] = await Promise.all([
                    productService.getAllProducts(),
                    categoryService.getAllCategories(),
                    newsService.getAllNews().catch(() => []),
                    bannerService.getAllBanners().catch(() => []),
                ]);

                // Lấy các nhóm sản phẩm đặc biệt
                const [newData, bestData, saleData] = await Promise.all([
                    productService.getAllProducts({ is_new: 'true' }),
                    productService.getAllProducts({ is_best: 'true' }),
                    productService.getAllProducts({ is_sale: 'true' }),
                ]);

                const banner = (bannerData && bannerData.length > 0 ? bannerData[0] : null);
                setHeroBanner(banner);
                setProducts(prodData || []);
                setCategories(catData || []);
                setNews((newsData && newsData.length > 0 ? newsData : fallbackNews).slice(0, 3));
                setNewProducts(newData || []);
                setBestProducts(bestData || []);
                setSaleProducts(saleData || []);
            } catch (error) {
                console.error('Lỗi tải dữ liệu trang chủ:', error);
            }
        };

        fetchData();
    }, []);

    const marqueeProducts = [...(products || [])];
    const displayCategories = categories.slice(0, 4);
    const heroImage = heroBanner?.image ? resolveImageUrl(heroBanner.image) : fallbackHeroImage;
    const heroTitle = heroBanner?.title || 'Thể hiện phong cách nam tính';
    const heroSubtitle = heroBanner?.subtitle || 'Khám phá bộ sưu tập thời trang nam mới nhất với thiết kế thanh lịch, chất lượng tốt và phong cách hiện đại.';
    const heroButtonLabel = heroBanner?.button_text || 'Mua ngay';
    const heroLink = heroBanner?.link || '/products';

    const productCardClass = "group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-red-400 transition dark:border-white/10 dark:bg-[#121212]";
    const linkMoreClass = "text-sm text-gray-600 hover:text-red-400 transition dark:text-gray-300 dark:hover:text-red-400";

    return (
        <div className="bg-gray-50 text-gray-900 dark:bg-[#0f0f10] dark:text-white">
            <section className="relative w-full h-[70vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 max-w-4xl">
                    <span className="text-sm uppercase tracking-[0.35em] text-red-400 mb-4">HYPERMAN</span>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider leading-none mb-4 text-white">
                        {heroTitle}
                    </h1>
                    <p className="text-base md:text-xl text-gray-200 max-w-2xl mb-8">
                        {heroSubtitle}
                    </p>
                    <Link to={heroLink} className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition">
                        {heroButtonLabel}
                    </Link>
                </div>
            </section>

            {/* Sản phẩm nổi bật */}
            <section className="py-14 bg-white border-t border-gray-200 dark:bg-[#151515] dark:border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-2">Bộ sưu tập hot</p>
                            <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900 dark:text-white">Sản phẩm nổi bật</h2>
                        </div>
                        <Link to="/products" className={linkMoreClass}>
                            Xem tất cả
                        </Link>
                    </div>

                    <div className="marquee-group overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-black/20">
                        <div className="marquee-track flex gap-4 py-3 pl-3">
                            {[...marqueeProducts, ...marqueeProducts].map((product, idx) => (
                                <Link
                                    to={`/products/${product.id}`}
                                    key={`${product.id}-${idx}`}
                                    className="group min-w-[260px] max-w-[260px] rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-red-400 transition dark:border-white/10 dark:bg-[#121212]"
                                >
                                    <div className="h-64 overflow-hidden">
                                        <img
                                            src={resolveImageUrl(product.image)}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs uppercase text-red-400 mb-2">{product.Category?.name || 'Sản phẩm'}</p>
                                        <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[48px] dark:text-white">{product.name}</h3>
                                        <div className="mt-3 text-red-500 font-bold">{Number(product.price || 0).toLocaleString('vi-VN')} đ</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sản phẩm mới */}
            {newProducts.length > 0 && (
                <section className="py-16 bg-gray-100 border-t border-gray-200 dark:bg-[#0f0f10] dark:border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-2">Hàng mới về</p>
                                <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900 dark:text-white">Sản phẩm mới</h2>
                            </div>
                            <Link to="/products?filter=new" className={linkMoreClass}>Xem tất cả</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {newProducts.slice(0, 4).map((product) => (
                                <Link key={product.id} to={`/products/${product.id}`} className={productCardClass}>
                                    <div className="h-48 overflow-hidden">
                                        <img src={resolveImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 dark:text-white">{product.name}</h3>
                                        <div className="mt-2 text-red-500 font-bold">{Number(product.price || 0).toLocaleString('vi-VN')} đ</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Sản phẩm bán chạy */}
            {bestProducts.length > 0 && (
                <section className="py-16 bg-white border-t border-gray-200 dark:bg-[#151515] dark:border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-2">Được yêu thích</p>
                                <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900 dark:text-white">Sản phẩm bán chạy</h2>
                            </div>
                            <Link to="/products?filter=best" className={linkMoreClass}>Xem tất cả</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {bestProducts.slice(0, 4).map((product) => (
                                <Link key={product.id} to={`/products/${product.id}`} className={productCardClass}>
                                    <div className="h-48 overflow-hidden">
                                        <img src={resolveImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 dark:text-white">{product.name}</h3>
                                        <div className="mt-2 text-red-500 font-bold">{Number(product.price || 0).toLocaleString('vi-VN')} đ</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Sản phẩm giảm giá */}
            {saleProducts.length > 0 && (
                <section className="py-16 bg-gray-100 border-t border-gray-200 dark:bg-[#0b0b0c] dark:border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-2">Ưu đãi đặc biệt</p>
                                <h2 className="text-2xl md:text-3xl font-bold uppercase text-gray-900 dark:text-white">Sản phẩm giảm giá</h2>
                            </div>
                            <Link to="/products?filter=sale" className={linkMoreClass}>Xem tất cả</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {saleProducts.slice(0, 4).map((product) => {
                                const hasSale = product.sale_price && Number(product.sale_price) > 0 && Number(product.sale_price) < Number(product.price);
                                return (
                                    <Link key={product.id} to={`/products/${product.id}`} className={productCardClass}>
                                        <div className="h-48 overflow-hidden">
                                            <img src={resolveImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 dark:text-white">{product.name}</h3>
                                            {hasSale ? (
                                                <div className="mt-2">
                                                    <div className="text-red-500 font-bold">{Number(product.sale_price).toLocaleString('vi-VN')} đ</div>
                                                    <div className="text-gray-500 text-xs line-through">{Number(product.price).toLocaleString('vi-VN')} đ</div>
                                                </div>
                                            ) : (
                                                <div className="mt-2 text-red-500 font-bold">{Number(product.price || 0).toLocaleString('vi-VN')} đ</div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Danh mục */}
            <section className="py-16 bg-white border-t border-gray-200 dark:bg-[#0b0b0c] dark:border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-3">Danh mục</p>
                        <h2 className="text-3xl font-bold uppercase text-gray-900 dark:text-white">Khám phá từng danh mục</h2>
                    </div>

                    <div className="space-y-6">
                        {displayCategories.length > 0 ? displayCategories.map((cat, index) => {
                            const isAlternate = index % 2 === 1;

                            return (
                                <div key={cat.id} className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-[#141414]">
                                    <div className={`p-8 flex flex-col justify-center ${isAlternate ? 'lg:order-2' : 'lg:order-1'}`}>
                                        <span className="text-xs uppercase tracking-[0.35em] text-red-400 mb-3">{cat.name}</span>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">{cat.name}</h3>
                                        <p className="text-gray-600 text-base leading-7 mb-6 dark:text-gray-300">
                                            {cat.description || 'Bộ sưu tập phong cách hiện đại, phù hợp cho mọi thời điểm.'}
                                        </p>
                                        <Link
                                            to={`/search?q=${encodeURIComponent(cat.name)}`}
                                            className="inline-flex items-center justify-center w-fit rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 transition"
                                        >
                                            Xem ngay
                                        </Link>
                                    </div>
                                    <div className={`min-h-[320px] overflow-hidden ${isAlternate ? 'lg:order-1' : 'lg:order-2'}`}>
                                        <img
                                            src={resolveImageUrl(cat.image)}
                                            alt={cat.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="col-span-full text-center text-gray-500 py-8 dark:text-gray-400">Đang tải danh mục...</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Tin tức */}
            <section className="py-16 bg-gray-100 border-t border-gray-200 dark:bg-[#111112] dark:border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-2">Tin tức</p>
                            <h2 className="text-3xl font-bold uppercase text-gray-900 dark:text-white">Tư vấn thời trang</h2>
                        </div>
                        <Link to="/news" className={linkMoreClass}>
                            Xem thêm
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {news.map((item) => (
                            <article key={item.id} className="rounded-3xl overflow-hidden border border-gray-200 bg-white dark:border-white/10 dark:bg-[#141414]">
                                <div className="h-56 overflow-hidden">
                                    <img src={resolveImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 dark:text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-3 dark:text-gray-300">{item.content || 'Chưa có mô tả chi tiết cho bài viết này.'}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
