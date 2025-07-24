const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // à restreindre plus tard
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Serveur de messagerie en temps réel en ligne 🚀");
});

// Gestion des utilisateurs en ligne (Map pour stocker socket.id => pseudo)
const usersOnline = new Map();

io.on("connection", (socket) => {
  console.log("Nouvel utilisateur connecté :", socket.id);

  // Événement pour recevoir le pseudo de l'utilisateur dès qu'il se connecte
  socket.on("user_connected", (pseudo) => {
    usersOnline.set(socket.id, pseudo);
    console.log(`Pseudo ${pseudo} connecté`);

    // On envoie à tous le nombre d'utilisateurs en ligne
    io.emit("users_online", usersOnline.size);
  });

  // Événement pour envoyer un message
  socket.on("send_message", (data) => {
    console.log("Message reçu :", data);

    // Réenvoi du message à tous les utilisateurs
    io.emit("receive_message", data);
  });

  // Quand un utilisateur se déconnecte
  socket.on("disconnect", () => {
    const pseudo = usersOnline.get(socket.id);
    usersOnline.delete(socket.id);
    console.log(`Utilisateur déconnecté : ${pseudo || socket.id}`);

    // Mise à jour du nombre d'utilisateurs en ligne
    io.emit("users_online", usersOnline.size);
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
