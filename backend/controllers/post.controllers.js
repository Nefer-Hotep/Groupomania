const multer = require("multer");
const path = require("path");
const db = require("../models");

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
    const  id  = req.params.id;
    const userId = req.auth.userId;
    // let newImageUrl

    // // console.log(userId);
    // let post = await Post.findByPk(id);

    // if (userId === post.userId) {
    //     if (req.file) {
    //         newImageUrl = req.file.path
    //         if (post.image) {

    //         }
    //     }
    //     if (req.body.message) {
    //         post.message = req.body.message;
    //     }
    //     console.log(post.message);
    //     post.update({
    //         message: post.message
    //     });
    //     res.status(200).json({ message: "Post modifié" });
    // } else {
    //     res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    // }
    const post = await Post.update(req.body, { where: { id: id }})
    res.status(200).send(post)
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
    const data = await User.findAll({
        include: [
            {
                model: Post,
                as: "posts",
            },
        ],
        where: { id: 39 },
    });
    res.status(200).send(data);
};

// Upload Image Controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

exports.upload = multer({
    storage: storage,
    limits: { fileSize: "1000000" },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeTypes = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeTypes && extname) {
            return cb(null, true);
        }
        cb("Give proper formate to upload");
    },
}).single("image");
