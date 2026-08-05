const { News } = require('../models');

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({ order: [['createdAt', 'DESC']] });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await News.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Không tìm thấy bài viết!' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const image = req.file ? `/uploads/news/${req.file.filename}` : (req.body.image || null);

        const newNews = await News.create({
            title,
            image,
            content,
            status: status || 'active'
        });
        res.status(201).json({ message: 'Thêm bài viết thành công!', news: newNews });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await News.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Không tìm thấy bài viết!' });

        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/news/${req.file.filename}`;
        }

        await item.update(updateData);
        res.json({ message: 'Cập nhật bài viết thành công!', news: item });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await News.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Không tìm thấy bài viết!' });
        await item.destroy();
        res.json({ message: 'Xóa bài viết thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};