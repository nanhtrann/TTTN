module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        category_id: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        sale_price: { type: DataTypes.DECIMAL(10, 2) },
        quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
        description: { type: DataTypes.TEXT },
        is_new: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_sale: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_best: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { tableName: 'products', timestamps: true });
    return Product;
};