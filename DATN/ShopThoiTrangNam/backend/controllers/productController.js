const { Products, Categories, sequelize } = require('../models');
const { Op } = require('sequelize');

// 1. Lấy danh sách tất cả sản phẩm (GET /products)
// Hỗ trợ lọc: ?category=&minPrice=&maxPrice=&sort=&is_new=&is_sale=&is_best=
exports.getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sort, is_new, is_sale, is_best } = req.query;

        // Xây dựng điều kiện lọc
        const where = {};

        if (category) {
            where.category_id = category;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = Number(minPrice);
            if (maxPrice) where.price[Op.lte] = Number(maxPrice);
        }

if (is_new === 'true') where.is_new = true;
if (is_sale === 'true') {
            // Sản phẩm giảm giá: có cờ is_sale HOẶC có sale_price hợp lệ (< price)
            where[Op.or] = [
                { is_sale: true },
                { sale_price: { [Op.ne]: null, [Op.lt]: sequelize.col('price') } }
            ];
        }
        if (is_best === 'true') where.is_best = true;

        // Xác định thứ tự sắp xếp
        let order = [['createdAt', 'DESC']];
        switch (sort) {
            case 'price_asc':
                order = [['price', 'ASC']];
                break;
            case 'price_desc':
                order = [['price', 'DESC']];
                break;
            case 'name_asc':
                order = [['name', 'ASC']];
                break;
            case 'name_desc':
                order = [['name', 'DESC']];
                break;
            default:
                break;
        }

        const products = await Products.findAll({
            where,
            include: [{ model: Categories, attributes: ['id', 'name'] }],
            order
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// 2. Lấy chi tiết một sản phẩm theo ID (GET /products/:id)
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id, {
            include: [{ model: Categories, attributes: ['id', 'name'] }]
        });
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// 3. Thêm sản phẩm mới (POST /products)
exports.createProduct = async (req, res) => {
    try {
        const { category_id, name, price, sale_price, quantity, description, is_new, is_sale, is_best } = req.body;
        const image = req.file ? `/uploads/products/${req.file.filename}` : null;

        const newProduct = await Products.create({
            category_id,
            name,
            image,
            price,
            sale_price,
            quantity,
            description,
            is_new,
            is_sale,
            is_best
        });

        res.status(201).json({ message: 'Thêm sản phẩm thành công!', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// 4. Cập nhật sản phẩm (PUT /products/:id)
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật!' });
        }

        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/products/${req.file.filename}`;
        }

        await product.update(updateData);
        res.json({ message: 'Cập nhật sản phẩm thành công!', product });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// 5. Tìm kiếm sản phẩm theo từ khóa (GET /products/search?q=...)
exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || !q.trim()) {
            return res.json([]);
        }

        const keyword = q.trim();
        const products = await Products.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } }
                ]
            },
            include: [{ model: Categories, attributes: ['id', 'name'] }]
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// 6. Xóa sản phẩm (DELETE /products/:id)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa!' });
        }

        await product.destroy();
        res.json({ message: 'Xóa sản phẩm thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};