
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
    host : "localhost",
    dialect : "mysql",
    username: "root",
    database: "camps_blog",
    logging: console.log,
});

module.exports = sequelize;