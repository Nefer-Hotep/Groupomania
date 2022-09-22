module.exports = {
    HOST: "localhost",
    DB: "groupomania",
    USER: `${process.env.DB_USER}`,
    PASSWORD: `${process.env.DB_PASS}`,
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
