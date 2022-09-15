const PostModel = require("../models/Posts");

exports.getAllPosts = (req, res) => {
    PostModel.findAll()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json({ err }));
};

exports.createPost = (req, res) => {
    const post = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
    });

    post.save()
        .then(() => res.status(201).json(post))
        .catch((err) => res.status(400).json({ err }));
};

exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    PostModel.findByPk(id)
        .then((post) => {
            if (!post)
                return res
                    .status(400)
                    .json({ message: "ID unkown : " + req.params });
            post.message = body.message;
            post.save()
                .then(res.status(201).json({ msg: "Post updated !" }))
                .catch((err) => res.status(500).json({ err }));
        })
        .catch((err) => res.status(500).json({ err }));
};

exports.deletePost = (req, res) => {
    const { id } = req.params;
    PostModel.destroy({ where: { postId: id } })
        .then((user) => {
            if (user === 0) return res.status(404).json({ msg: "Not Found" });
            res.status(200).json({ msg: "Post deleted !" });
        })
        .catch((err) => res.status(500).json({ err }));
};
