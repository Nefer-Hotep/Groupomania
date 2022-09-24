const token = require("../middleware/token")
const multer = require("multer");
const path = require("path");
const db = require("../models");

// Create main Model
const User = db.users;
const Post = db.posts;

exports.getAllPosts = async (req, res) => {
    await Post.findAll({
        order: [["createdAt", "DESC"]],
    })  
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(500).json({ err }));
};

exports.createPost = async (req, res) => {

   let image

   if (req.file) {
    image = req.file.path
   } else {
    image = null
   }

    const post = await Post.create({
        image: image,
        message: req.body.message,
    });
    res.status(201).json({ message : "Post ajouté"});
    console.log(post.dataValues);
};

exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    Post.findByPk(id)
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
    PostModel.destroy({ where: { id: id } })
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
        where: { id: 30 },
    });
    res.status(200).send(data)
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
