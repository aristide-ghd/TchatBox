import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // Simuler la récupération du pseudo de l'utilisateur connecté
  const pseudo = localStorage.getItem("pseudo") || "Moi";

  useEffect(() => {
    // Rediriger si pas de token
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      pseudo,
      content: message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Tchat en direct</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      <div
        className="border rounded p-3 mb-3 bg-light"
        style={{ height: "400px", overflowY: "scroll" }}
      >
        {messages.length === 0 ? (
          <p className="text-muted text-center">Aucun message pour le moment.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <strong>{msg.pseudo}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Écrivez un message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}
