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
    const body = req;
    const error = userValidation(body);
    if (error) return res.status(401).json(error.details[0].message);
    // User.create({ ...req.body });
};
exports.login = (req, res) => {};
