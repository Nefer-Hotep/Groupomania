const { DataTypes } = require("sequelize");
const db = require("../config/db");

const PostModel = db.define("posts", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = PostModel;
 