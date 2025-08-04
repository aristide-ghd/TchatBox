const Message = require('../models/message.js');
const Utilisateur = require('../models/user.js');

// Envoyer un message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.identity._id; // récupéré grâce au middleware d'authentification

    // Vérifier que le contenu du message n'est pas vide
    if (!content || content.trim() === "") {
      return res.status(400).json({ 
        message: 'Le contenu du message ne peut pas être vide' 
      });
    }

    // Verifier que le destinataire existe
    if (!receiverId) {
      return res.status(400).json({
        message: "Le destinataire du message est requis"
      })
    }

    // Vérifier que le destinataire existe dans la base de données
    const receiverIdExists = await Utilisateur.findById(receiverId);

    if (!receiverIdExists) {
      return res.status(404).json({
        message: "Destinataire non trouvé"
      })
    }

    // Verifier que l'expediteur et le destinataire ne sont pas les memes
    if (senderId === receiverId) {
      return res.status(400).json({
        message: "Vous ne pouvez pas envoyer un message à vous-même"
      })
    }

    const dataMessage = {
        senderId : senderId,
        receiverId : receiverId,
        content : content,
    };

    const message = new Message(dataMessage);
    
    // Sauvegarder le message dans la base de données
    await message.save();

    res.status(201).json({ 
        message: 'Message envoyé', 
        data: message 
    });
  } catch (error) {
    res.status(500).json({ 
        message: 'Erreur serveur', 
        error: error.message 
    });
  }
};

// Récupérer les messages entre deux utilisateurs
const getMessages = async (req, res) => {
  try {
    const userId = req.user.identity._id;
    const { otherUserId } = req.params;

    // Vérifier que l'ID de l'autre utilisateur existe
    const otherUserIdExists = await Utilisateur.findById(otherUserId);

    if (!otherUserIdExists) {
      return res.status(404).json({
        message: "L'utilisateur avec cet ID n'existe pas"
      })
    }

    // Récupère tous les messages échangés entre deux utilisateurs (l'utilisateur actuel et l'autre)
    const messages = await Message.find({
      $or: [
        // Condition 1 : les messages envoyés par l'utilisateur actuel à l'autre utilisateur
        { senderId: userId, receiverId: otherUserId },

        // Condition 2 : les messages envoyés par l'autre utilisateur à l'utilisateur actuel
        { senderId: otherUserId, receiverId: userId }
      ]
      // On utilise $or pour récupérer les deux sens de conversation
    }).sort({ createdAt: 1 }); // Trie les messages du plus ancien au plus récent (ordre croissant)

    res.status(200).json(messages);
    
  } catch (error) {
    res.status(500).json({ 
        message: 'Erreur serveur', 
        error: error.message 
    });
  }
};


// Exemple dans userController.js
const getAllUsersExceptMe = async (req, res) => {
  try {
    const users = await Utilisateur.find({ _id: { $ne: req.user.identity._id } }, 'pseudo email _id');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};


module.exports = {
  sendMessage,
  getMessages,
  getAllUsersExceptMe
};