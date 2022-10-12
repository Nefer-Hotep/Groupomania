const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidation = require("../validation/validation");

const User = db.users;

exports.signup = (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const { body } = req;
            const { error } = userValidation(body);
            if (error) return res.status(401).json(error.details[0].message);
            User.create({ ...req.body, password: hash, admin: false })
                .then((result) => {
                    res.status(201).json(result);
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        })
        .catch((err) => res.status(500).json({ err }));
};

exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (user === null) {
                // Si il ne trouve pas d'utilisateur erreur 401 + message.
                res.status(401).json({
                    message: "Incorrect username/password",
                });
            } else {
                // Compare avec bcrypt le mdp reçu avec celui stocké dans la bdd.
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            // Si le mdp est invalide erreur 401 + message.
                            res.status(401).json({
                                message: "Incorrect username/password",
                            });
                        } else {
                            // Si le mdp est valide code 200 + objet avec les infos requis pour l'auth.
                            res.status(200).json({
                                userId: user.id,
                                // Appel la fonction .sign de jwt qui encode le payload du token.
                                token: jwt.sign(
                                    // Objet userId qui vérifie l'identifiant de l'utilisateur appelé.
                                    { userId: user.id },
                                    // Clé secrète d'encodage.
                                    `${process.env.TOKEN_SECRET}`,
                                    // Durée d'expiration du token.
                                    { expiresIn: "24h" }
                                ),
                            });
                        }
                    })
                    // Si erreur d'exécution de la requête au serveur code 500.
                    .catch((error) => {
                        res.status(500).json({ error });
                    });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

exports.logout = (req, res) => {
    res.status(200).json({ token: "" });
    res.redirect("/");
};
