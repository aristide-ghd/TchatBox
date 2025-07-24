const Utilisateur = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

// Fonction pour créer un nouvel utilisateur
exports.createUser = async (req,res) => {
    try{
        const data = req.body;

        // Verifier si l'email existe dejà
        const existingUser = await Utilisateur.findOne({email: data.email});

        if (existingUser) {
            return res.status(400).json({
                Message: "Un utilisateur avec cet email existe déjà."
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
            Message: "Utilisateur crée avec succès",
            User: newUser
        })
    }
    catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ 
            Message: "Erreur lors de la création de l'utilisateur", 
            Erreur: error.message 
        });
    }
};

exports.loginUser = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({
            Message: "Erreur lors de la connexion de l'utilisateur",
            Erreur: error.message
        });
    }
}