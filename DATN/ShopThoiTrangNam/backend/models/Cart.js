module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false }
    }, { tableName: 'carts', timestamps: true });
    return Cart;
};