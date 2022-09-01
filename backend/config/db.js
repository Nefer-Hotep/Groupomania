const Sequelize = require("sequelize");

// const db = mysql.createConnection({
//     user: `${process.env.DB_USER}`,
//     host: "localhost",
//     password: `${process.env.DB_PASS}`,
//     database: "groupomania",
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log("MySql connected !");
// });

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
