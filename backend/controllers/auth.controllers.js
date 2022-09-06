const User = require("../models/Users");
const bcrypt = require("bcrypt");
const userValidation = require("../validation/validation");

exports.signup = (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const { body } = req;
            const { error } = userValidation(body);
            if (error) return res.status(401).json(error.details[0].message);
            User.create({ ...req.body, password: hash })
                .then((result) => {
                    res.status(201).json(result);
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        })
        .catch((err) => res.status(500).json({ err }));
};
exports.login = (req, res) => {};
