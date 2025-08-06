
# 💬 TchatBox - Messagerie avec Authentification et Discussion Privée

Ce projet est une application de messagerie en temps réel avec :

- 📝 Inscription et connexion sécurisées (email, pseudo, mot de passe)  
- 🔐 Authentification via JWT  
- 💬 Discussion privée entre deux utilisateurs connectés  
- 📱 Interface simple et responsive avec Bootstrap CSS  
- ⚙️ Backend Node.js avec Express, Socket.IO et MongoDB (via Mongoose)  

---

## 🚀 Fonctionnalités actuelles

1. 👤 Inscription d’un utilisateur avec email, pseudo,sexe et mot de passe hashé  

2. 🔑 Connexion avec génération d’un token JWT  

3. 🔒 Protection des routes  

4. 📨 Envoi et réception de messages privés en temps réel entre deux utilisateurs  

5. 👥 Affichage des utilisateurs en ligne  

---

## 🛠️ Technologies utilisées

- Node.js, Express, Socket.IO  

- MongoDB et Mongoose  

- bcrypt pour le hash des mots de passe  

- jsonwebtoken pour la gestion des tokens JWT  

- Bootstrap CSS pour le frontend  

---

## ⚙️ Installation et lancement

1. Cloner le projet et installer les dépendances :

\`\`\`bash
- git clone https://github.com/ton-utilisateur/tchatbox.git
- cd tchatbox/backend
- npm install
\`\`\`

2. Installer et lancer MongoDB (local ou distant)  

3. Créer un fichier \`.env\` avec :

- PORT=3000
- JWT_SECRET=tonsecretpourjwt
- MONGODB_URI=mongodb://localhost:27017/tchatbox

4. Démarrer le serveur backend :

\`\`\`bash
npm run dev
# ou
nodemon server.js
\`\`\`

5. Ouvrir le frontend (index.html) dans un navigateur  

---

## 🎯 Objectifs à venir

- Améliorer l’interface utilisateur  

- Gérer les groupes de discussion  

---

## ✍️ Auteur

Ton Nom - contact@exemple.com  

---

Merci d’utiliser TchatBox ! 🚀
