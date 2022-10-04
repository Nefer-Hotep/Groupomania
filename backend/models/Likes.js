module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
        "likes",
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIcrement: true,
            },
            postId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIcrement: true,
            },
        },
        {
            timestamps: false,
        }
    );

    return Like;
};
