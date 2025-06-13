const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('my_database', 'root', '123456', {
    host: 'localhost', // địa chỉ máy chủ MySQL
    port: 3307, // nếu MySQL không chạy cổng mặc định
    dialect: 'mysql',
    logging: false, // tắt log SQL
});

let connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;