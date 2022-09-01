const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const Sequelize = require("./config/db");
const userRoutes = require("./routes/user.routes");
const app = express();

// Connection à MySql avec sequelize.
Sequelize.sync()
    .then(console.log("Connection has been established successfully."))
    .catch((error) => console.log(error));

// Définie les headers (en-têtes) pour les autorisations CORS.
app.use((req, res, next) => {
    // Donne le contrôle a tout le monde.
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Autorise certains en-tête.
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    // Autorise certaines methode CRUD.
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    // next() renvoie la réponse.
    next();
});

app.use(express.json());

app.use(userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
