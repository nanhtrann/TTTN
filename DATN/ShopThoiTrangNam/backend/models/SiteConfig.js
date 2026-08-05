module.exports = (sequelize, DataTypes) => {
    const SiteConfig = sequelize.define('SiteConfig', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        logo: { type: DataTypes.STRING },
        primary_color: { type: DataTypes.STRING, defaultValue: '#dc2626' },
        show_new_products: { type: DataTypes.BOOLEAN, defaultValue: true },
        show_best_products: { type: DataTypes.BOOLEAN, defaultValue: true },
        show_sale_products: { type: DataTypes.BOOLEAN, defaultValue: true },
        show_news: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, { tableName: 'site_config', timestamps: true });
    return SiteConfig;
};