module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define('Banner', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        subtitle: { type: DataTypes.TEXT },
        image: { type: DataTypes.STRING, allowNull: false },
        link: { type: DataTypes.STRING, allowNull: false },
        button_text: { type: DataTypes.STRING, defaultValue: 'Mua ngay' },
        status: { type: DataTypes.ENUM('active', 'hidden'), defaultValue: 'active' }
    }, { tableName: 'banners', timestamps: true });
    return Banner;
};