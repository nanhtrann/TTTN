const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Khởi tạo các bảng
db.Users = require('./User')(sequelize, DataTypes);
db.Categories = require('./Category')(sequelize, DataTypes);
db.Products = require('./Product')(sequelize, DataTypes);
db.Banners = require('./Banner')(sequelize, DataTypes);
db.News = require('./News')(sequelize, DataTypes);
db.Carts = require('./Cart')(sequelize, DataTypes);
db.CartItems = require('./CartItem')(sequelize, DataTypes);
db.Orders = require('./Order')(sequelize, DataTypes);
db.OrderDetails = require('./OrderDetail')(sequelize, DataTypes);
db.SiteConfig = require('./SiteConfig')(sequelize, DataTypes);

// Thiết lập Quan hệ (Associations)
db.Categories.hasMany(db.Products, { foreignKey: 'category_id' });
db.Products.belongsTo(db.Categories, { foreignKey: 'category_id' });

db.Users.hasOne(db.Carts, { foreignKey: 'user_id' });
db.Carts.belongsTo(db.Users, { foreignKey: 'user_id' });

db.Carts.hasMany(db.CartItems, { foreignKey: 'cart_id' });
db.CartItems.belongsTo(db.Carts, { foreignKey: 'cart_id' });

db.Products.hasMany(db.CartItems, { foreignKey: 'product_id' });
db.CartItems.belongsTo(db.Products, { foreignKey: 'product_id' });

db.Users.hasMany(db.Orders, { foreignKey: 'user_id' });
db.Orders.belongsTo(db.Users, { foreignKey: 'user_id' });

db.Orders.hasMany(db.OrderDetails, { foreignKey: 'order_id' });
db.OrderDetails.belongsTo(db.Orders, { foreignKey: 'order_id' });

db.Products.hasMany(db.OrderDetails, { foreignKey: 'product_id' });
db.OrderDetails.belongsTo(db.Products, { foreignKey: 'product_id' });

module.exports = db;