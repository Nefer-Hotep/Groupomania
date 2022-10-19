module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("posts", {
        id : {
            type :DataTypes.INTEGER.UNSIGNED,
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
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    return Post;
};
