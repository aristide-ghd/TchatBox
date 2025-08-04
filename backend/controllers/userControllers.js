const Utilisateur = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

// Fonction pour créer un nouvel utilisateur
const createUser = async (req,res) => {
    try{
        const data = req.body;

        // Verifier si l'email existe dejà
        const existingUser = await Utilisateur.findOne({email: data.email});

        if (existingUser) {
            return res.status(400).json({
                message: "Un utilisateur avec cet email existe déjà."
            })
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(data.motDePasse, 10);

        // Vérification des champs requis
        const dataUser = {
            pseudo: data.pseudo,
            email: data.email,
            motDePasse: hashedPassword,
            sexe: data.sexe,
        }
        // Création de l'utilisateur
        const newUser = new Utilisateur(dataUser);

        // Sauvegarde de l'utilisateur dans la base de données
        await newUser.save();

        res.status(200).json({
            message: "Utilisateur crée avec succès",
            User: newUser
        })
    }
    catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ 
            message: "Erreur lors de la création de l'utilisateur", 
            Erreur: error.message 
        });
    }
};

//Generation d'un jeton après connexion de l'utilisateur
const generateJwt= (identity) =>{
    try {

        if (!process.env.JWT_SECRET) {
            throw new Error("Clé JWT non définie dans le fichier .env");
        }

        // Sélectionner uniquement les informations nécessaires pour le token
        const payload = {
            identity: {
                _id: identity._id, // ID de l'utilisateur
                email: identity.email, // Email de l'utilisateur
                role: identity.role, // Rôle de l'utilisateur
                nom: identity.nom, // Nom de l'utilisateur
                prenom: identity.prenom, // Prénom de l'utilisateur
            },
        };

        // {identity} si je veux tout envoyé
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: "12h" }
        );
  
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 12);
  
        return {
            token,
            expiresIn: "12h",
            expirationTime
        };
    }
    catch (error) {
        console.error("Erreur lors de la génération du token:", error.message);
        throw error; // ← très important pour ne pas retourner undefined
    }
};

const loginUser = async (req, res) => {
    try {
        // Recuperer l'email et le mot de passe depuis le corps de la requete
        const { email, motDePasse} = req.body;

        // Verifier si l'email existe dans la base de données
        const utilisateur = await Utilisateur.findOne({email});

        if (!utilisateur) {
            return res.status(400).json({ 
                message: "L'email est invalide" 
            });
        }
        
        // Comparer le mot de passe fourni avec le mot de passe stocké dans la base de données
        const mot_de_passe_correct = await bcrypt.compare(motDePasse, utilisateur.motDePasse);

        if (!mot_de_passe_correct) {
            return res.status(401).json({ 
                message: "Le mot de passe est incorrect. Veuillez réessayer!"
            });
        }

        const return_token = generateJwt(utilisateur);

        // console.log("Data",return_token);

        res.status(200).json({ 
            message: "Connexion réussie", 
            data:return_token, 
            utilisateur: {   
                _id: utilisateur._id, 
                pseudo: utilisateur.pseudo, 
                email: utilisateur.email,
                sexe: utilisateur.sexe,
            }, 
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la connexion de l'utilisateur",
            Erreur: error.message
        });
    }
};

module.exports = {
    createUser,
    loginUser,
};