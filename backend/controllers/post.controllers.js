const db = require("../models");
const fs = require("fs");

// Create main Model
const User = db.users;
const Post = db.posts;

exports.getAllPosts = async (req, res) => {
    await Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: User,
                as: "users",
                attributes: ["pseudo", "id"],
            },
        ],
    })
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(500).json({ err }));
};

exports.createPost = async (req, res) => {
    let image;

    if (req.file) {
        image = req.file.path;
    } else {
        image = null;
    }

    const post = await Post.create({
        userId: req.auth.userId,
        image: image,
        message: req.body.message,
    });
    res.status(201).json({ message: "Post ajouté" });
    console.log(post.dataValues);
};

exports.updatePost = async (req, res) => {
    const id = req.params.id;
    const userId = req.auth.userId;
    let newImageUrl;

    let post = await Post.findByPk(id);

    console.log(req.body);
    if (userId === post.userId) {
        if (req.file) {
            newImageUrl = req.file.path;
            if (post.image) {
                // Récupère le nom de fichier des images.
                console.log(post.image);
                const filename = post.image.split("images")[1];
                console.log(filename);
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) console.log(err);
                    else {
                        console.log(`Deleted file: images/${filename}`);
                    }
                });
            }
        }
        if (req.body.message != null) {
            post.message = req.body.message;
        } else {
            res.status(400).json("Donnée manquante !");
            return;
        }
        post.update({
            image: newImageUrl,
            message: post.message,
        });
        res.status(200).json({ message: "Post modifié" });
    } else {
        res.status(401).json({ message: "Vous n'avez pas les droits requis" });
    }
};

exports.deletePost = (req, res) => {
    const { id } = req.params;
    Post.destroy({ where: { id: id } })
        .then((user) => {
            if (user === 0) return res.status(404).json({ msg: "Not Found" });
            res.status(200).json({ msg: "Post deleted !" });
        })
        .catch((err) => res.status(500).json({ err }));
};

// Récupère le post de la table users
exports.getUsersPosts = async (req, res) => {
    const userId = req.auth.userId;

    if (userId) {
        const data = await User.findAll({
            attributes: {
                exclude: ["email", "password", "createdAt", "updatedAt"],
            },
            include: [
                {
                    model: Post,
                    as: "posts",
                },
            ],
            where: { id: userId },
        });
        res.status(200).send(data);
    } else {
        res.status(401).json({ message: "Vous n'avez pas les droits requis" });
    }
};
