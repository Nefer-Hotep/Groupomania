const dbConfig = require("../config/db");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./Users")(sequelize, DataTypes);
db.posts = require("./Posts")(sequelize, DataTypes);

// Connection à MySql avec sequelize.
db.sequelize
    .sync({ force: false })
    .then(console.log("Table and model synced succesfully !."))
    .catch((error) => console.log(error));

// 1 à plusieurs relations

db.users.hasMany(db.posts, {
    foreignKey: "userId",
    as: "posts",
});

db.posts.belongsTo(db.users, {
    foreignKey: "userId",
    as: "users",
});

module.exports = db;
