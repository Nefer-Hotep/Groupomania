module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("posts", {
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
