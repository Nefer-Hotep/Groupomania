const multer = require("multer");
const path = require("path");
const PostModel = require("../models/Posts");

exports.getAllPosts = (req, res) => {
    PostModel.findAll()
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(500).json({ err }));
};

exports.createPost = (req, res) => {
    const post = new PostModel({
        id: req.body.id,
        userId: req.body.userId,
        image: req.file.path,
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
    PostModel.destroy({ where: { id: id } })
        .then((user) => {
            if (user === 0) return res.status(404).json({ msg: "Not Found" });
            res.status(200).json({ msg: "Post deleted !" });
        })
        .catch((err) => res.status(500).json({ err }));
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
    limits: {fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeTypes = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeTypes && extname) {
            return cb(null, true)
        }
        cb('Give proper formate to upload')
    }
}).single('image')