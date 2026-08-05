module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        image: { type: DataTypes.STRING },
        status: { type: DataTypes.ENUM('active', 'hidden'), defaultValue: 'active' }
    }, { tableName: 'categories', timestamps: true });
    return Category;
};