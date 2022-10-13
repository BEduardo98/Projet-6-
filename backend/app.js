const express = require("express");
const mongoose = require("mongoose"); // C'est notre base de donnée
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require("path");
const cookieSession = require("cookie-session") //Nous sert à recuperer le cookie du user
const app = express();

// Connection au serveur MongoDB Atlas
mongoose.connect("mongodb+srv://FUKCVzToZVIP4gBo:FUKCVzToZVIP4gBo@projetapprentisage.ht2mj1q.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    })
.then (() => console.log("Connexion à MongoDB réussie !"))
.catch(() => console.log("Connexion à MongoDB échouée !"));

// Intércepte les requetes qui ont un contenu de type json
app.use(express.json());

// Configuration de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Récuperer le cookie du user
app.use(cookieSession({
    secret: "0286b1e1806abe19986f7a16421dab5c56e09106fe0ddac0c2bf874db2606afa647a10",
    httpOnly: true
}));

// Routes
app.use('/api/sauces', stuffRoutes);
app.use("/api/auth", userRoutes);

// Gestion de la ressource image de façon statique
// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, "images")));

module.exports = app;
