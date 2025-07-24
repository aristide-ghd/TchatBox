const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Récupération du token depuis l'en-tête Authorization
        let token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Accès refusé. Aucun jeton n'a été fourni." });
        }

        // Vérification du format du token (doit commencer par "Bearer ")
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        } else {
            return res.status(400).json({ message: "Format du jeton invalide." });
        }

        // Vérification et décodage du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajout des informations utilisateur au req
        next(); // Passage au middleware suivant
    } catch (err) {
        res.status(401).json({ message: "Jeton invalide ou expiré." });
    }
};

module.exports = { 
    authMiddleware 
};