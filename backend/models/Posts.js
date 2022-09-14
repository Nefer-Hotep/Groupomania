const { DataTypes } = require("sequelize");
const db = require("../config/db");

const PostModel = db.define("posts", {
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = PostModel;
