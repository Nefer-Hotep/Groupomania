// Import d'express dans une constante depuis le package.json.
const express = require("express");
// Appel le controller pour associer les fonctions aux différentes routes.
const postCtrl = require("../controllers/post.controllers");
// Crée un router en utilisant la méthode .Router() d'express.
const router = express.Router();

// Create
router.post("/", postCtrl.createPost);
// Read (all)
router.get("/", postCtrl.getAllPosts);
// Read (One)
// router.get("/:id", postCtrl.getOne);
// Update
// router.put("/:id", postCtrl.updateOne);
// Delete
// router.delete("/:id", postCtrl.deleteOne);

// Exporte le router pour être accessible par les autres fichiers
module.exports = router;
