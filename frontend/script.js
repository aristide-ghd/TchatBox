const socket = io("http://localhost:3000");

// Demander le pseudo (nickname) à l'utilisateur
let pseudo = prompt("Entre ton pseudo :")?.trim();
while (!pseudo) {
  pseudo = prompt("Le pseudo ne peut pas être vide. Entre ton pseudo :")?.trim();
}

// Envoyer au serveur que cet utilisateur est en ligne
socket.emit("user_connected", pseudo);

// Mettre à jour la liste des utilisateurs en ligne (count est un nombre)
socket.on("users_online", (count) => {
  const onlineDiv = document.getElementById("users-online");
  onlineDiv.textContent = `👥 ${count} en ligne`;
});

// Fonction utilitaire : formater l'heure hh:mm
function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Générer une couleur pastel unique basée sur le pseudo (pour l’avatar)
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

// Créer un avatar avec initiales et fond coloré
function createAvatar(name) {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  const bgColor = stringToColor(name);

  const avatar = document.createElement("div");
  avatar.textContent = initials;
  avatar.className = "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0";
  avatar.style.backgroundColor = bgColor;

  return avatar;
}

// Affichage des messages dans des bulles
socket.on("receive_message", (data) => {
  const chatBox = document.getElementById("chat-box");

  // Déterminer si le message est de l'utilisateur actuel
  const isMe = data.sender === pseudo;

  // Wrapper flex container pour alignement
  const wrapper = document.createElement("div");
  wrapper.className = `flex items-end ${isMe ? "justify-end" : "justify-start"}`;

  // Bulle du message
  const messageBubble = document.createElement("div");
  messageBubble.className = `max-w-[70%] rounded-lg p-3 shadow break-words whitespace-pre-wrap ${
    isMe ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
  }`;


  // Envoi info (pseudo + heure)
  const infoDiv = document.createElement("div");
  infoDiv.className = "flex items-center mb-1 space-x-2";

  // Avatar (uniquement côté destinataire)
  if (!isMe) {
    const avatar = createAvatar(data.sender);
    infoDiv.appendChild(avatar);
  }

  // Pseudo
  const senderSpan = document.createElement("span");
  senderSpan.className = "font-semibold text-sm";
  senderSpan.textContent = data.sender;
  infoDiv.appendChild(senderSpan);

  // Heure
  const timeSpan = document.createElement("span");
  timeSpan.className = "text-xs text-light-600 ml-auto";
  timeSpan.textContent = formatTime(data.timestamp);
  infoDiv.appendChild(timeSpan);

  messageBubble.appendChild(infoDiv);

  // Message texte
  const msgText = document.createElement("p");
  msgText.textContent = data.message;
  messageBubble.appendChild(msgText);

  wrapper.appendChild(messageBubble);
  chatBox.appendChild(wrapper);

  // Scroll automatique vers le bas
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Fonction pour envoyer un message
function sendMessage() {
  const input = document.getElementById("message");
  const message = input.value.trim();
  if (!message) return;

  const data = {
    sender: pseudo,
    message,
    timestamp: new Date().toISOString(),
  };

  socket.emit("send_message", data);
  input.value = "";
}
