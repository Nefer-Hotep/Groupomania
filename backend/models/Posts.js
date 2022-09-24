module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("posts", {
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
