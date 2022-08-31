const mysql = require("mysql");

const db = mysql.createConnection({
    user: `${process.env.DB_USER}`,
    host: "localhost",
    password: `${process.env.DB_PASS}`,
    database: "groupomania",
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySql connected !");
});

module.exports = db;
