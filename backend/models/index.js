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
db.likes = require("./Likes")(sequelize, DataTypes);

// Connection à MySql avec sequelize.

db.sequelize
    .sync({ force: false })
    .then(console.log("Table and model synced succesfully !."))
    .catch((error) => console.log(error));

// Relations de des Users avec leurs posts

db.users.hasMany(db.posts, {
    foreignKey: "userId",
    as: "posts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.posts.belongsTo(db.users, {
    foreignKey: "userId",
    as: "users",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relations des likes avec les users
db.users.hasMany(db.likes, {
    foreignKey: "userId",
    as: "likes",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.likes.belongsTo(db.users, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relations des likes avec les posts
db.posts.hasMany(db.likes, {
    foreignKey: "postId",
    as: "likes",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

db.likes.belongsTo(db.posts, {
    foreignKey: "postId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = db;
