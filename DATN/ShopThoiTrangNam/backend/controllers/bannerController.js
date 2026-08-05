const { Banners } = require('../models');

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banners.findAll({ order: [['createdAt', 'DESC']] });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.getBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banners.findByPk(id);
        if (!banner) return res.status(404).json({ message: 'Không tìm thấy banner!' });
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.createBanner = async (req, res) => {
    try {
        const { title, subtitle, link, button_text, status } = req.body;
        const image = req.file ? `/uploads/banners/${req.file.filename}` : (req.body.image || null);

        if (!image) {
            return res.status(400).json({ message: 'Vui lòng cung cấp hình ảnh banner!' });
        }

        const newBanner = await Banners.create({
            title,
            subtitle,
            image,
            link,
            button_text: button_text || 'Mua ngay',
            status: status || 'active'
        });
        res.status(201).json({ message: 'Thêm banner thành công!', banner: newBanner });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banners.findByPk(id);
        if (!banner) return res.status(404).json({ message: 'Không tìm thấy banner!' });

        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/banners/${req.file.filename}`;
        }

        await banner.update(updateData);
        res.json({ message: 'Cập nhật banner thành công!', banner });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banners.findByPk(id);
        if (!banner) return res.status(404).json({ message: 'Không tìm thấy banner!' });
        await banner.destroy();
        res.json({ message: 'Xóa banner thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};