const express = require("express");
const stuffCtrl = require('../controllers/stuff');
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const router = express.Router();

// Afficher toutes les sauces
router.get("/",auth, stuffCtrl.getAllSauce);
// Afficher une seule sauce
router.get("/:id",auth, stuffCtrl.getOneSauce);
// Supprimer un produit
router.delete('/:id',auth, multer, stuffCtrl.deleteOneSauce);
// Modifier une sauce
router.put('/:id',auth, multer, stuffCtrl.modifySauce);
// Ajouter une sauce
router.post('/',auth, multer, stuffCtrl.addSauce);
// Ajouter un like ou un dislike
router.post('/:id/like',auth, stuffCtrl.likeDislikes);

module.exports = router;