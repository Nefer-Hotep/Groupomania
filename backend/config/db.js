const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "groupomania",
    `${process.env.DB_USER}`,
    `${process.env.DB_PASS}`,
    {
        host: "localhost",
        dialect: "mysql",
    }
);

module.exports = sequelize;
