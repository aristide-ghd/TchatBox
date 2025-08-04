import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/users";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    motDePasse: "",
    pseudo: "",
    sexe: "Homme",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin ? `${API_URL}/login` : `${API_URL}/create`;
      const payload = isLogin
        ? { email: form.email, motDePasse: form.motDePasse }
        : form;

      const res = await axios.post(url, payload);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("pseudo", res.data.pseudo);
        navigate("/chat");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur inconnue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>

        {!isLogin && (
          <>
            <input
              type="text"
              name="pseudo"
              placeholder="Pseudo"
              value={form.pseudo}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <select
              name="sexe"
              value={form.sexe}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          name="motDePasse"
          placeholder="Mot de passe"
          value={form.motDePasse}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded"
        >
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <button className="text-blue-600" onClick={toggleMode}>
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
}
