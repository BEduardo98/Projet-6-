const http = require("http");
const app = require("./app")

// Cette fonction nous renvoie un port valide
const normalizePort = val => {
    const port = parseInt (val , 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port)
// Elle s'arrête ici



// Cette fonction recherce les différentes erreurs et les gère de manière appropriée
// Les erreurs sont enregistrée dans le serveur
const errorHandler = error => {
    if (error.syscall != 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? 'pipe' + address : 'port' + port ;
    switch(error.code) {
        case 'EACCES' : 
            console.error(bind + "require elevated privileges.");
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;
        default :
            throw error;
    }
};
// Elle s'arrête ici

// On lui passe l'application dans les parametres
const server = http.createServer(app);

server.on("error", errorHandler);

// Cette fonction écoute les evénements et consigne le port ou le canal sur lequel le serveur s'éxecute
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    console.log("Listening on " + bind)
})
// Elle s'arrête ici

server.listen(port);