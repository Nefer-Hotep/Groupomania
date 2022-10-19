// Import d'express dans une constante depuis le package.json.
const express = require("express");
// Appel le controller pour associer les fonctions aux différentes routes.
const authCtrl = require("../controllers/auth.controllers");
const userCtrl = require("../controllers/user.controllers");
// Import du middleware de gestion d'autorisation.
const auth = require("../middleware/auth");
// Crée un router en utilisant la méthode .Router() d'express.
const router = express.Router();

/* Route d'authentification */

// Crée la route post /signup avec les fonctions du controller et la méthode .signup.
router.post("/signup", authCtrl.signup);
// Crée la route post /login avec les fonctions du controller et la méthode .login.
router.post("/login", authCtrl.login);
// Crée la route get /logout du controller pour la déconnexion.
router.get("/logout", authCtrl.logout);

/* Route d'utilisateur */

// Read (all)
router.get("/", auth, userCtrl.getAllUsers);
// Read (One)
router.get("/:id", auth, userCtrl.getOneUser);
// Update
router.put("/:id", auth, userCtrl.updateOneUser);
// Delete
router.delete("/:id", auth, userCtrl.deleteOneUser);

// Exporte le router pour être accessible par les autres fichiers
module.exports = router;
