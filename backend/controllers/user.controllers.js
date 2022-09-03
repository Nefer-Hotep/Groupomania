const User = require("../models/Users");
const userValidation = require("../validation/validation");

exports.signup = (req, res) => {
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;

    // Sequelize.query(
    //     "INSERT INTO users (name, email, password) VALUES (?,?,?)",
    //     [name, email, password],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.send("Values Inserted");
    //         }
    //     }
    // );

    // console.log(req.body);
    const error = userValidation(req);
    if (error) return res.status(401).json(error);
    User.create({ ...req.body }).then((result) => {
        res.status(201).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    });;

};
exports.login = (req, res) => {};
