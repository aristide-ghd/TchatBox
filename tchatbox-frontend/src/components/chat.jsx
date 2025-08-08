import React, { useEffect, useState, useRef} from "react";
import axios from "axios";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import ParametresModal from "./parametresModal";
import '../Chat.css';

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showParams, setShowParams] = useState(false);

  const token = localStorage.getItem("token");
  const pseudo = localStorage.getItem("pseudo");
  const navigate = useNavigate();

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pseudo");
    navigate("/");
  };

  // Charger la liste des autres utilisateurs
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/others`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Erreur utilisateurs", err));
  }, [token]);

  // Charger les messages avec un utilisateur
  const loadMessages = async (receiverId) => {
    setLoadingMessages(true);
    setSelectedReceiver(receiverId);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/conversation/${receiverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur messages", err);
    }

    setLoadingMessages(false);
  };

  // Envoyer un message
  const handleSend = async () => {
    if (!content.trim()) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/send`,
        { receiverId: selectedReceiver, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const nouveauMessage = res.data.data;

      setMessages((prev) => [...prev, nouveauMessage]);

      setContent("");
    } catch (err) {
      console.error("Erreur envoi message:", err.response?.data || err.message);
      alert("Erreur lors de l'envoi du message");
    }
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getReceiverInfo = () => users.find((u) => u._id === selectedReceiver);

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 bg-primary">
        
        {/* Colonne des utilisateurs */}
<div
  className={`col-12 col-md-3 bg-white border-end d-flex flex-column p-0 shadow-sm
    ${selectedReceiver ? "d-none d-md-flex" : ""}`}
  style={{
    height: "100vh",
    borderRadius: "0 0px 0px 0",
    overflow: "hidden"
  }}
>
  {/* Header logo */}
  <div className="sticky-top bg-primary text-white py-3 px-3 shadow-sm">
    <h1 className="m-0 fw-bold fs-5 d-flex align-items-center gap-2">
      <span role="img" aria-label="logo" style={{ fontSize: "1.5rem" }}>💬</span>
      TchatBox
    </h1>
  </div>

  {/* Titre liste */}
  <div className="bg-light px-3 py-2 border-bottom sticky-top">
    <h6 className="m-0 fw-semibold text-secondary text-uppercase" style={{ fontSize: "0.75rem" }}>
      Liste des contacts
    </h6>
  </div>

  {/* Liste scrollable */}
  <div className="flex-grow-1 overflow-auto mb-5">
    {window.innerWidth <= 768 && !selectedReceiver && (
      <div className="alert alert-info text-center py-2 small m-2">
        Sélectionnez un contact pour discuter
      </div>
    )}

    {users.map((user) => (
      <div
        key={user._id}
        className={`d-flex align-items-center p-2 px-3 rounded-0 border-bottom contact-item ${
          selectedReceiver === user._id ? "bg-primary text-white" : "bg-white"
        }`}
        style={{ cursor: "pointer", transition: "background 0.3s" }}
        onClick={() => loadMessages(user._id)}
      >
        <Avatar
          name={user.pseudo}
          round
          size="40"
          className="me-3 border"
          style={{ flexShrink: 0 }}
        />
        <div className="flex-grow-1">
          <strong className="d-block" style={{ fontSize: "0.9rem" }}>{user.pseudo}</strong>
          <small className={selectedReceiver === user._id ? "text-light" : "text-muted"}>
            {user.email}
          </small>
        </div>
      </div>
    ))}
  </div>

<div className="settings-footer">
      <button 
        className="settings-btn"
        onClick={() => setShowParams(true)}
        >
        <i className="bi bi-gear-fill"></i>
        Paramètres
      </button>
    </div>
</div>

        {/* Colonne de messages */}
        <div
          className={`col-12 col-md-9 d-flex flex-column p-0
            ${!selectedReceiver ? "d-none d-md-flex" : ""}`}
          style={{ height: "100vh" }}
            >
            {/* En-tête de conversation */}
            <div
                className="bg-primary text-white p-3 d-flex align-items-center sticky-top"
                style={{ flexShrink: 0, zIndex: 1000}}
                >
                {selectedReceiver && (
                    <button
                    className="btn btn-sm me d-md-none"
                    onClick={() => setSelectedReceiver(null)}
                    aria-label="Retour"
                    style={{ fontSize: '1rem', fontWeight: '200', color: 'white' }}
                    >
                    ❮
                    </button>
                )}

                {selectedReceiver ? (
                <>
                    <Avatar
                    name={getReceiverInfo()?.pseudo || "?"}
                    round
                    size="40"
                    className="me-2"
                    />
                    <h6 className="m-0">{getReceiverInfo()?.pseudo}</h6>
                </>
                ) : (
                    <h6 className="m-0">Sélectionnez un contact pour discuter</h6>
                )}

                <div className="ms-auto d-flex align-items-center">
                    <span className="me-3 small d-none d-md-inline">
                        Connecté en tant que <strong>{pseudo}</strong>
                    </span>
                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </button>
                </div>
            </div>

            {/* Zone des messages scrollable */}
            <div
                className="flex-grow-1 overflow-auto px-3 py-2 bg-light"
                style={{ minHeight: 0, maxHeight: "100%", overflowY: "auto" }}
                >
                {loadingMessages ? (
                <p>Chargement des messages...</p>
                ) : (
                messages.map((msg) => (
                    <div
                    key={msg._id}
                    className={`d-flex mb-2 ${
                        msg.senderId === selectedReceiver
                        ? "justify-content-start"
                        : "justify-content-end"
                    }`}
                    >
                    <div
                        className={`p-2 rounded-pill ${
                        msg.senderId === selectedReceiver
                            ? "bg-secondary text-white"
                            : "bg-primary text-white"
                        }`}
                        style={{ maxWidth: "70%" }}
                    >
                        {msg.content}
                    </div>
                    </div>
                ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            {selectedReceiver && (
                <div className="p-3 border-top d-flex sticky-bottom bg-light" style={{ flexShrink: 0 }}>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Écrire un message..."
                        className="form-control me-2"
                    />
                    <button className="btn btn-success" onClick={handleSend}>
                        Envoyer
                    </button>
                </div>
            )}
        </div>
    </div>

      {/* MODAL des paramètres */}
      <ParametresModal
        show={showParams}
        handleClose={() => setShowParams(false)}
        pseudo={pseudo}
        handleLogout={handleLogout}
      />
    </div>
  );
}
