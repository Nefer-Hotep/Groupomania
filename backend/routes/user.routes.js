// Import d'express dans une constante depuis le package.json.
const express = require("express");
// Appel le controller pour associer les fonctions aux différentes routes.
const authCtrl = require("../controllers/auth.controllers");
const userCtrl = require('../controllers/user.controllers')
// Crée un router en utilisant la méthode .Router() d'express.
const router = express.Router();


/* Route d'authentification */

// Crée la route post /signup avec les fonctions du controller et la méthode .signup.
router.post("/signup", authCtrl.signup);
// Crée la route post /login avec les fonctions du controller et la méthode .login.
router.post("/login", authCtrl.login);

/* Route d'utilisateur */ 

// Create
router.post("/", userCtrl.createOne);
// Read (all)
router.get("/", userCtrl.getAll);
// Read (One)
router.get("/:id", userCtrl.getOne);
// Update
router.put("/:id", userCtrl.updateOne);
// Delete
router.delete("/:id", userCtrl.deleteOne);

// Exporte le router pour être accessible par les autres fichiers
module.exports = router;