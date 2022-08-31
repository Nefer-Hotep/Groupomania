const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const db = require("./config/db");
const app = express();

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

app.post("/signup", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (name, email, password) VALUES (?,?,?)",
        [name, email, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
