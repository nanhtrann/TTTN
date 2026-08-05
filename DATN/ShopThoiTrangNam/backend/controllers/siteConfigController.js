const { SiteConfig } = require('../models');

// GET /api/site-config - Lấy cấu hình giao diện (public, không cần auth)
exports.getSiteConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            // Tự tạo bản ghi mặc định nếu chưa có
            config = await SiteConfig.create({});
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// PUT /api/site-config - Cập nhật cấu hình giao diện (yêu cầu admin)
exports.updateSiteConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            config = await SiteConfig.create({});
        }

        const { logo, primary_color, show_new_products, show_best_products, show_sale_products, show_news } = req.body;

        const updateData = {};
        if (logo !== undefined) updateData.logo = logo;
        if (primary_color !== undefined) updateData.primary_color = primary_color;
        if (show_new_products !== undefined) updateData.show_new_products = show_new_products;
        if (show_best_products !== undefined) updateData.show_best_products = show_best_products;
        if (show_sale_products !== undefined) updateData.show_sale_products = show_sale_products;
        if (show_news !== undefined) updateData.show_news = show_news;

        await config.update(updateData);
        res.json({ message: 'Cập nhật cấu hình giao diện thành công!', config });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};