const PostModel = require("../models/Posts");

exports.getAllPosts = (req, res) => {
    PostModel.findAll()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json({ err }));
};

exports.createPost = (req, res) => {
    PostModel
};
