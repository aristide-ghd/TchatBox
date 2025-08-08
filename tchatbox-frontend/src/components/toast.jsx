// Toast.js
import React, { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto-close après 4s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
  className={`toast ${type}`}
  style={{
    position: "fixed",
    top: "0px",
    right: "0px",
    background: type === "success" ? "#4CAF50" : (type === "error" ? "#f44336" : "#333"),
    color: "white",
    padding: "12px 16px",
    borderRadius: "6px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    animation: "slideIn 0.5s ease-out",
    maxWidth: "300px",
    zIndex: 9999,
  }}
>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          marginLeft: "auto", 
        }}
      >
        ×
      </button>
    </div>
  );
}
