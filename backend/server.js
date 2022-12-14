const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
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

// routers
app.use("/api/user", userRoutes);
app.use('/api/post', postRoutes)

// static Images Folder
app.use('/Images', express.static('./Images'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
