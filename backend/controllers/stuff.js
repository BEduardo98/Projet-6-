const Sauce = require("../models/sauces");
const fs = require("fs");


// Afficher toutes les sauce
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({error}))
};

// Afficher une seule sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
};

// Effacer une sauce
exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Sauce supprimé !"}))
                    .catch(error => res.status(401).json({error}))
                })
        })
        .catch(error => res.status(500).json({error}))
};

// Ajouter une sauce au site
exports.addSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
    })
    sauce.save()
        .then(() => res.status(201).json({message : "Sauce crée !"}))
        .catch(error => res.status(400).json({error}))
};

// Modifier une sauce existante sur le site
exports.modifySauce = (req, res , next ) => {
    if(req.file) {
        // Si image modifié, il faut supprimer l'ancienne image de la sauce dans le dossier /image
        Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                // Une fois l'image supprimé on peut mettre le produit à jour avec la nouvelle image
                const sauceObject = {
                    ...JSON.parse(req.body.sauce),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: "Sauce modifiée !"}))
                    .catch(error => res.status(400).json({error}));
            })
        })
        .catch(error => res.status(400).json({error}))
    }
    else {
        // Si l'image n'est pas modifié
        const sauceObject = {...req.body};
        Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message: "Sauce modifiée !"}))
            .catch(error => res.status(400).json({error}));
    }
};

exports.likeDislikes = (req, res, next) => {
    // Like présent dans le body
    let like = req.body.like
    // On prend le userID
    let userId = req.body.userId
    // On prend l'id de la sauce
    let sauceId = req.params.id
  
    if (like === 1) { // Si il s'agit d'un like
      Sauce.updateOne({_id: sauceId}, 
        {
            $push: {usersLiked: userId},
            $inc: {likes: +1}, // On incrémente de 1
        })
        .then(() => res.status(200).json({message: 'j\'aime ajouté !'}))
        .catch((error) => res.status(400).json({error}))
    }
    if (like === -1) { // S'il s'agit d'un dislike
      Sauce.updateOne({_id: sauceId}, 
          {
            $push: { usersDisliked: userId },
            $inc: { dislikes: +1 }, // On incrémente de 1
          }
        )
        .then(() => {res.status(200).json({message: 'Dislike ajouté !'})})
        .catch((error) => res.status(400).json({error}))
    }
    if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
      Sauce.findOne({_id: sauceId})
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
            Sauce.updateOne({ _id: sauceId },
                { $pull: {usersLiked: userId},
                $inc: {likes: -1}, // On incrémente de -1
                }
            )
            .then(() => res.status(200).json({message: 'Like retiré !'}))
            .catch((error) => res.status(400).json({error}))
          }
          else if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
            Sauce.updateOne({_id: sauceId}, 
                {
                $pull: {usersDisliked: userId},
                $inc: {dislikes: -1}, // On incrémente de -1
                })
              .then(() => res.status(200).json({message: 'Dislike retiré !'}))
              .catch((error) => res.status(400).json({error}))
          }
        })
        .catch((error) => res.status(404).json({error}))
    }
}

