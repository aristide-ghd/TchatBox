const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    pseudo: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      unique: true, 
      required: true, 
      trim: true,
      lowercase: true // Convertit l'email en minuscules
    },
    motDePasse: { 
      type: String, 
      required: false 
    },
    sexe: { 
      type: String, 
      enum: ["Homme", "Femme"],
      required: true 
    },
  },
  { 
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
  }
);

// Middleware pour convertir l'email en lowercase avant de sauvegarder
userSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  if (this.emailRdv) {
    this.emailRdv = this.emailRdv.toLowerCase();
  }
  next();
});


module.exports = mongoose.model("User", userSchema);