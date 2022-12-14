const db = require("../models");
const fs = require("fs");

// Crée les Model principaux.
const User = db.users;
const Post = db.posts;
const Like = db.likes;

exports.getAllPosts = async (req, res) => {
    await Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: User,
                as: "users",
                attributes: ["pseudo", "id"],
            },
            {
                model: Like,
                as: "likes",
                attributes: ["userId"],
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

    await Post.create({
        userId: req.auth.userId,
        image: image,
        message: req.body.message,
    })
        .then(() => res.status(201).json({ message: "Post ajouté" }))
        .catch((err) => res.status(500).json({ err }));
};

exports.updatePost = async (req, res) => {
    const id = req.params.id;
    const userId = req.auth.userId;
    let newImageUrl;

    const checkAdmin = await User.findByPk(userId);
    let post = await Post.findByPk(id);

    try {
        if (userId === post.userId || checkAdmin.admin === true) {
            if (req.file) {
                newImageUrl = req.file.path;
                if (post.image) {
                    // Récupère le nom de fichier des images.
                    const filename = post.image.split("images")[1];

                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) console.log(err);
                        else {
                            console.log(`Fichier supprimé: images/${filename}`);
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
            res.status(401).json({
                message: "Vous n'avez pas les droits requis",
            });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.auth.userId;

    const post = await Post.findByPk(id);
    const checkAdmin = await User.findByPk(userId);

    try {
        if (userId === post.userId || checkAdmin.admin === true) {
            if (post.image) {
                const filename = post.image.split("images")[1];

                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ where: { id: id } })
                        .then(() => {
                            res.status(200).json({ msg: "Post supprimé !" });
                        })
                        .catch((err) => res.status(500).json({ err }));
                });
            } else {
                Post.destroy({ where: { id: id } })
                    .then(() => {
                        res.status(200).json({ msg: "Post supprimé !" });
                    })
                    .catch((err) => res.status(500).json({ err }));
            }
        } else {
            res.status(401).json({
                message: "Vous n'avez pas les droits requis !",
            });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};

// Récupère le post de la table users
exports.getUsersPosts = async (req, res) => {
    const userId = req.auth.userId;
    try {
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
                    {
                        model: Like,
                        as: "likes",
                        attributes: ["postId"],
                    },
                ],
                where: { id: userId },
            });
            res.status(200).send(data);
        } else {
            res.status(401).json({
                message: "Vous n'avez pas les droits requis",
            });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};

exports.likePost = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const postId = req.params.id;
        const user = await Like.findOne({
            where: { userId: userId, postId: postId },
        });
        if (user) {
            await Like.destroy(
                { where: { userId: userId, postId: postId } },
                { truncate: true, restartIdentity: true }
            );
            res.status(200).send({ message: "Vous n'aimez plus ce post" });
        } else {
            await Like.create({ userId: userId, postId: postId });
            res.status(201).json({ message: "Vous aimez ce post" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
