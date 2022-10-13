const validation = require('mongoose-validator');

exports.validateSauceNom = [
    validation({
        validator: 'isLength',
        arguments: [3,60],
        message : "Le nom doit contenir entre 3 et 60 caractères !",
    }),
    validation({
        validator : 'isAlphanumeric',
        message : "Vous pouvez utiliser que des lettres pour le nom de votre sauce !",
    })
];

exports.validateNomFabricant = [
    validation({
        validator: 'isLength',
        arguments: [3,60],
        message : "Le nom doit contenir entre 3 et 60 caractères !",
    }),
    validation({
        validator : 'matches',
        arguments : /^[a-z\d\-_\s]+$/i,
        message : "Vous pouvez utiliser que des lettres et des chiffres pour le nom du fabricant !",
    })
];

exports.validateDescription = [
    validation({
        validator: 'isLength',
        arguments: [10,150],
        message : "La description de la sauce doit contenir entre 10 et 150 caractères !",
    }),
    validation({
        validator : 'matches',
        arguments : /^[a-z\d\-_\s]+$/i,
        message : "Vous pouvez utiliser que des lettres et des chiffres pour la description !",
    })
];

exports.validateIngrediant = [
    validation({
        validator: 'isLength',
        arguments: [3,20],
        message : "L'ingrédiant principal doit contenir entre 3 et 20 caractères !",
    }),
    validation({
        validator : 'isAlphanumeric',
        message : "Vous pouvez utiliser que des lettres pour l'ingrédiant principal !",
    })
];

