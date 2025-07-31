const Message = require('../models/message.js');

// Envoyer un message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id; // récupéré grâce au middleware d'authentification

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
    const userId = req.user.id;
    const otherUserId = req.params.otherUserId;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
    
  } catch (error) {
    res.status(500).json({ 
        message: 'Erreur serveur', 
        error: error.message 
    });
  }
};


module.exports = {
  sendMessage,
  getMessages
};