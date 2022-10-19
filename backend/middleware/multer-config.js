const multer = require("multer");
const path = require("path");

// Upload Image Controller
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        // Génère le nouveau nom pour le fichier en remplaçant
        // les espaces par des _ (empèche certaines erreurs serveur).
        let name = file.originalname.split(" ").join("_");
        name = name.substring(0, name.lastIndexOf("."));

        callback(null, name + Date.now() + path.extname(file.originalname));
    },
});

module.exports = multer({
    storage: storage,
    limits: { fileSize: "1000000" },
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeTypes = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeTypes && extname) {
            return callback(null, true);
        }
        callback("Give proper formate to upload");
    },
}).single("image");