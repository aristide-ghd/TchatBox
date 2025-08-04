const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser
} = require('../controllers/userControllers');
const {
    sendMessage,
    getMessages,
    getAllUsersExceptMe
} = require('../controllers/messageControllers');
const {
    authMiddleware
} = require('../middlewares/authMiddleware'); // middleware d'authentification
const {
    yupValidator
} = require('../middlewares/yup');
const {
    userDto,
    connexionDto,
    messageDto
} = require('../dto/tchatboxDto');

// Route pour créer un nouvel utilisateur
router.post(
    '/create',
    yupValidator(userDto),
    createUser
);

// Route pour se connecter
router.post(
    '/login',
    yupValidator(connexionDto),
    loginUser
);

// Route pour envoyer un message
router.post(
    '/send', 
    authMiddleware,
    yupValidator(messageDto), 
    sendMessage
);

// Route pour récupérer les messages entre deux utilisateurs
router.get(
    '/conversation/:otherUserId', 
    authMiddleware, 
    getMessages
);

// Route pour récupérer tous les utilisateurs sauf l'utilisateur connecté
router.get(
    '/others', 
    authMiddleware, 
    getAllUsersExceptMe
);

module.exports = router;