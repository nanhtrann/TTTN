const { Categories } = require('../models');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll({ order: [['createdAt', 'DESC']] });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByPk(id);
        if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục!' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const image = req.file ? `/uploads/categories/${req.file.filename}` : (req.body.image || null);
        const newCategory = await Categories.create({
            name,
            description,
            image,
            status: status || 'active'
        });
        res.status(201).json({ message: 'Thêm danh mục thành công!', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByPk(id);
        if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục!' });

        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/categories/${req.file.filename}`;
        }

        await category.update(updateData);
        res.json({ message: 'Cập nhật danh mục thành công!', category });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByPk(id);
        if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục!' });
        await category.destroy();
        res.json({ message: 'Xóa danh mục thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};