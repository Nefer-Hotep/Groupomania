// Import d'express dans une constante depuis le package.json.
const express = require("express");
// Appel le controller pour associer les fonctions aux différentes routes.
const ctrl = require("../controllers/controllers");
// Crée un router en utilisant la méthode .Router() d'express.
const router = express.Router();

// Create
router.post("/", ctrl.createOne);
// Read (all)
router.get("/", ctrl.getAll);
// Read (One)
router.get("/:id", ctrl.getOne);
// Update
router.put("/:id", ctrl.updateOne);
// Delete
router.delete("/:id", ctrl.deleteOne);

// Exporte le router pour être accessible par les autres fichiers
module.exports = router;