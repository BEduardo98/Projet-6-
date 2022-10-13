const mongoose = require("mongoose");
const sauceValidation = require("../middleware/validationSauce");


const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true, validate: sauceValidation.validateSauceNom},
    manufacturer: {type: String, required: true, validate: sauceValidation.validateNomFabricant},
    description: {type: String, required: true, validate : sauceValidation.validateDescription},
    mainPepper: {type: String, required: true, validate : sauceValidation.validateIngrediant},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]},
});

module.exports = mongoose.model('Sauces', sauceSchema);