import React from "react";
import { useNavigate } from "react-router-dom";

function Accueil() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/chat");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-body-tertiary text-center px-3">
      <div className="card shadow-sm border-0 p-5 bg-white" style={{ maxWidth: "650px", borderRadius: "1rem" }}>
        <h1 className="text-dark fw-bold mb-3">
          Bienvenue sur <span className="text-primary">TchatBox</span> 👋
        </h1>
        
        <p className="text-muted fs-5 mb-4">
          Échangez librement avec vos proches, en toute simplicité et rapidité.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/9068/9068750.png"
          alt="Discussion Illustration"
          className="img-fluid mb-4"
          style={{ maxHeight: "180px", objectFit: "contain" }}
        />

        <button
          onClick={handleStart}
          className="btn btn-primary btn-lg px-5 shadow-sm"
        >
          🚀 Démarrer
        </button>

        <hr className="my-4" />
        <p className="text-secondary small">
          TchatBox : des conversations instantanées, humaines et sécurisées.
        </p>
      </div>
    </div>
  );
}

export default Accueil;
