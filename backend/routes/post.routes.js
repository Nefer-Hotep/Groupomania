// Import d'express dans une constante depuis le package.json.
const express = require("express");
// Appel le controller pour associer les fonctions aux différentes routes.
const postCtrl = require("../controllers/post.controllers");
// Import de la gestion des fichiers images avec les configurations de multer.
const multer = require("../middleware/multer-config");
// Import du middleware de gestion d'autorisation.
const auth = require("../middleware/auth");
// Crée un router en utilisant la méthode .Router() d'express.
const router = express.Router();

// Create
router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, postCtrl.likePost);
// Read (all)
router.get("/", auth, postCtrl.getAllPosts);
// Read (User Post)
router.get("/getUserPosts", auth, postCtrl.getUsersPosts);
// Update
router.put("/:id", auth, multer, postCtrl.updatePost);
// Delete
router.delete("/:id", auth, multer, postCtrl.deletePost);

// Exporte le router pour être accessible par les autres fichiers
module.exports = router;
