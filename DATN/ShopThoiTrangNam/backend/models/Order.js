module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        status: { type: DataTypes.STRING, defaultValue: 'Pending' }, // Pending, Shipping, Completed, Cancelled
        shipping_address: { type: DataTypes.TEXT, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        payment_method: { type: DataTypes.STRING, defaultValue: 'COD' }
    }, { tableName: 'orders', timestamps: true });
    return Order;
};