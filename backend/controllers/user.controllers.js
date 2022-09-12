const UserModel = require("../models/Users");

exports.getAllUsers = async (req, res) => {
    const users = UserModel.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    })
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json({ err }));
};

exports.getOneUser = (req, res) => {
    const { id } = req.params;
    UserModel.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    })
        .then((users) => {
            if (!users)
                return res
                    .status(400)
                    .json({ message: "ID unkown : " + req.params });
            res.status(200).json(users);
        })
        .catch((err) => res.status(500).json({ err }));
};

exports.updateOneUser = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    UserModel.findByPk(id)
        .then((user) => {
            if (!user)
                return res
                    .status(400)
                    .json({ message: "ID unkown : " + req.params });
            user.pseudo = body.pseudo
            user.save().then(
                res.status(201).json({msg: "User updated !"})
            ).catch((err) => res.status(500).json({ err }));
        })
        .catch((err) => res.status(500).json({ err }));
};
exports.deleteOneUser = (req, res) => {};
