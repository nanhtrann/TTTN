module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING },
        content: { type: DataTypes.TEXT, allowNull: false },
        status: { type: DataTypes.ENUM('active', 'hidden'), defaultValue: 'active' }
    }, { tableName: 'news', timestamps: true });
    return News;
};