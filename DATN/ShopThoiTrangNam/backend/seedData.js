const db = require('./models');
const bcrypt = require('bcryptjs');

const users = [
  { name: 'Super Admin', email: 'superadmin@hype.com', password: bcrypt.hashSync('123456', 10), role: 'superadmin' },
  { name: 'Admin', email: 'admin@hype.com', password: bcrypt.hashSync('123456', 10), role: 'admin' },
  { name: 'Nguyễn Văn A', email: 'user@hype.com', password: bcrypt.hashSync('123456', 10), role: 'user' },
];

const categories = [
  { id: 1, name: 'Áo sơ mi', description: 'Danh mục áo sơ mi nam', image: '/uploads/categories/ao-so-mi.jpg', status: 'active' },
  { id: 2, name: 'Áo thun', description: 'Danh mục áo thun nam', image: '/uploads/categories/ao-thun.jpg', status: 'active' },
  { id: 3, name: 'Áo khoác', description: 'Danh mục áo khoác nam', image: '/uploads/categories/ao-khoac.jpg', status: 'active' },
  { id: 4, name: 'Quần Jean', description: 'Danh mục quần jean nam', image: '/uploads/categories/quan-jean.jpg', status: 'active' },
];

const banners = [
  {
    title: 'Thể hiện phong cách nam tính',
    subtitle: 'Khám phá bộ sưu tập thời trang nam mới nhất với thiết kế thanh lịch, chất lượng tốt và phong cách hiện đại.',
    image: '/uploads/banners/banner-hero.jpg',
    link: '/products',
    button_text: 'Mua ngay',
    status: 'active'
  }
];

const news = [
  {
    title: 'Xu hướng thời trang nam 2026: tối giản nhưng có điểm nhấn',
    image: '/uploads/news/news-1.jpg',
    content: 'Các bộ suit oversize, áo khoác nylon và quần jean washed blue đang chiếm trọn tâm điểm mùa mới.',
    status: 'active'
  },
  {
    title: 'Cách phối outfit công sở với áo sơ mi nam thanh lịch',
    image: '/uploads/news/news-2.jpg',
    content: 'Phối áo sơ mi với quần jean slim và sneaker trắng để tạo phong cách smart casual tối ưu.',
    status: 'active'
  },
  {
    title: 'Mẹo chọn áo thun nam mặc đi làm và đi chơi',
    image: '/uploads/news/news-3.jpg',
    content: 'Đừng chỉ chọn theo màu, hãy ưu tiên chất vải mềm, form vừa và dễ mix-and-match.',
    status: 'active'
  }
];

const products = [
  { category_id: 1, name: 'Áo sơ mi nam trắng basic', image: '/uploads/products/product-1.jpg', price: 250000, sale_price: null, quantity: 10, description: 'Áo sơ mi nam trắng basic, phong cách lịch lãm.', is_new: true, is_sale: false, is_best: false },
  { category_id: 1, name: 'Áo sơ mi nam xám công sở', image: '/uploads/products/product-2.jpg', price: 260000, sale_price: null, quantity: 12, description: 'Áo sơ mi nam xám công sở, dễ phối đồ.', is_new: false, is_sale: true, is_best: false },
  { category_id: 1, name: 'Áo sơ mi nam đen tối giản', image: '/uploads/products/product-3.jpg', price: 270000, sale_price: null, quantity: 8, description: 'Áo sơ mi đen tối giản, tinh tế.', is_new: true, is_sale: false, is_best: true },
  { category_id: 1, name: 'Áo sơ mi nam xanh navy', image: '/uploads/products/product-4.jpg', price: 265000, sale_price: null, quantity: 9, description: 'Áo sơ mi xanh navy, phom chuẩn.', is_new: false, is_sale: false, is_best: true },

  { category_id: 2, name: 'Áo thun nam cổ tròn trắng', image: '/uploads/products/product-5.jpg', price: 150000, sale_price: null, quantity: 20, description: 'Áo thun trắng phong cách casual.', is_new: true, is_sale: false, is_best: false },
  { category_id: 2, name: 'Áo thun nam đen oversized', image: '/uploads/products/product-6.jpg', price: 170000, sale_price: null, quantity: 15, description: 'Áo thun đen form rộng trend hiện đại.', is_new: false, is_sale: true, is_best: false },
  { category_id: 2, name: 'Áo thun nam sọc xanh', image: '/uploads/products/product-7.jpg', price: 160000, sale_price: null, quantity: 14, description: 'Áo thun sọc xanh trẻ trung.', is_new: true, is_sale: false, is_best: true },
  { category_id: 2, name: 'Áo thun nam đỏ năng động', image: '/uploads/products/product-8.jpg', price: 155000, sale_price: null, quantity: 13, description: 'Áo thun đỏ nổi bật cho mùa hè.', is_new: false, is_sale: false, is_best: true },

  { category_id: 3, name: 'Áo khoác nam dù chống nắng', image: '/uploads/products/product-9.jpg', price: 290000, sale_price: null, quantity: 11, description: 'Áo khoác dù chống nắng, tiện dụng.', is_new: true, is_sale: false, is_best: false },
  { category_id: 3, name: 'Áo khoác nam bomber xanh', image: '/uploads/products/product-10.jpg', price: 320000, sale_price: null, quantity: 7, description: 'Áo khoác bomber xanh, phong cách mạnh mẽ.', is_new: false, is_sale: true, is_best: true },
  { category_id: 3, name: 'Áo khoác nam gió đen', image: '/uploads/products/product-11.jpg', price: 300000, sale_price: null, quantity: 9, description: 'Áo khoác gió chống gió, mặc thoải mái.', is_new: true, is_sale: false, is_best: false },
  { category_id: 3, name: 'Áo khoác nam nỉ xám', image: '/uploads/products/product-12.jpg', price: 350000, sale_price: null, quantity: 6, description: 'Áo khoác nỉ xám ấm áp cho mùa lạnh.', is_new: false, is_sale: true, is_best: true },

  { category_id: 4, name: 'Quần Jean nam slim xanh đậm', image: '/uploads/products/product-13.jpg', price: 350000, sale_price: null, quantity: 10, description: 'Quần jean slim tôn dáng và bền đẹp.', is_new: true, is_sale: false, is_best: false },
  { category_id: 4, name: 'Quần Jean nam rộng cổ điển', image: '/uploads/products/product-14.jpg', price: 360000, sale_price: null, quantity: 12, description: 'Quần jean rộng phong cách vintage.', is_new: false, is_sale: true, is_best: false },
  { category_id: 4, name: 'Quần Jean nam đen tối giản', image: '/uploads/products/product-15.jpg', price: 340000, sale_price: null, quantity: 8, description: 'Quần jean đen dễ phối cùng áo khoác.', is_new: true, is_sale: false, is_best: true },
  { category_id: 4, name: 'Quần Jean nam washed blue', image: '/uploads/products/product-16.jpg', price: 375000, sale_price: null, quantity: 5, description: 'Quần jean washed blue phong cách ở nhà.', is_new: false, is_sale: false, is_best: true },
];

const siteConfig = {
  logo: null,
  primary_color: '#dc2626',
  show_new_products: true,
  show_best_products: true,
  show_sale_products: true,
  show_news: true,
};

async function seed() {
  try {
    await db.sequelize.sync({ alter: true });

    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await db.CartItems.destroy({ where: {}, truncate: true });
    await db.OrderDetails.destroy({ where: {}, truncate: true });
    await db.Orders.destroy({ where: {}, truncate: true });
    await db.Carts.destroy({ where: {}, truncate: true });
    await db.Products.destroy({ where: {}, truncate: true });
    await db.News.destroy({ where: {}, truncate: true });
    await db.Banners.destroy({ where: {}, truncate: true });
    await db.Categories.destroy({ where: {}, truncate: true });
    await db.Users.destroy({ where: {}, truncate: true });
    await db.SiteConfig.destroy({ where: {}, truncate: true });
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await db.Users.bulkCreate(users, { validate: true });
    await db.Categories.bulkCreate(categories, { validate: true });
    await db.Products.bulkCreate(products, { validate: true });
    await db.News.bulkCreate(news, { validate: true });
    await db.Banners.bulkCreate(banners, { validate: true });
    await db.SiteConfig.create(siteConfig);

    console.log('Seed dữ liệu thành công: 3 users (superadmin/admin/user), 4 danh mục, 16 sản phẩm, 3 tin tức, 1 banner, 1 site config.');
    console.log('Tài khoản test:');
    console.log('  Super Admin: superadmin@hype.com / 123456');
    console.log('  Admin:       admin@hype.com / 123456');
    console.log('  User:        user@hype.com / 123456');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi seed database:', error.message);
    process.exit(1);
  }
}

seed();