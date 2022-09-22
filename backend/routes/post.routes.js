// Import d'express dans une constante depuis le package.json.
const express = require("express");
// Appel le controller pour associer les fonctions aux différentes routes.
const postCtrl = require("../controllers/post.controllers");
// Import du middleware de gestion d'autorisation.
const auth = require("../middleware/auth");
// Crée un router en utilisant la méthode .Router() d'express.
const router = express.Router();

// Create
router.post("/", auth, postCtrl.upload, postCtrl.createPost);
// Read (all)
router.get("/", postCtrl.getAllPosts);
// Read (User Post)
router.get('/getUserPost', postCtrl.getUsersPosts)
// Update
router.put("/:id", auth, postCtrl.updatePost);
// Delete
router.delete("/:id", auth, postCtrl.deletePost);

// Exporte le router pour être accessible par les autres fichiers
module.exports = router;
