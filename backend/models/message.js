const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true
    },
    receiverId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: false // Peut être null pour les messages publics, 
    },
    content: { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
  }
);

module.exports = mongoose.model("Message", messageSchema);
