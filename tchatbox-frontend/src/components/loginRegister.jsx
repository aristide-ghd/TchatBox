import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    motDePasse: "",
    pseudo: "",
    sexe: "Homme",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // bloquer le rechargement
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const url = isLogin ? `${API_URL}/login` : `${API_URL}/create`;
      const payload = isLogin
        ? { email: form.email, motDePasse: form.motDePasse }
        : form;

      const res = await axios.post(url, payload);

      if (isLogin) {
        if (res.data.data.token) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("pseudo", res.data.utilisateur.pseudo);

          setSuccess("Connexion réussie ! Vous serez redirigé vers la messagerie...");
          
          setTimeout(() => {
            navigate("/chatR");
          }, 3000); // délai de 2 secondes
        }
      } else {
        setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setIsLogin(true);
      }

    } catch (err) {
      setError(err.response?.data?.Message || "Erreur inconnue");
    }

    setLoading(false);
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="card-title text-center mb-4">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>

        {success && (
          <div className="alert alert-success text-center" role="alert">
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-3">
                <label htmlFor="pseudo" className="form-label">
                  Pseudo
                </label>
                <input
                  id="pseudo"
                  type="text"
                  name="pseudo"
                  value={form.pseudo}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Votre pseudo"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="sexe" className="form-label">
                  Sexe
                </label>
                <select
                  id="sexe"
                  name="sexe"
                  value={form.sexe}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Votre email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="motDePasse" className="form-label">
              Mot de passe
            </label>
            <div className="input-group">
              <input
                id="motDePasse"
                type={showPassword ? "text" : "password"}
                name="motDePasse"
                value={form.motDePasse}
                onChange={handleChange}
                className="form-control"
                placeholder="Mot de passe"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                {/* {showPassword ? "🙈" : "👁️"} */}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? (isLogin ? "Connexion en cours..." : "Inscription en cours...")
              : isLogin
              ? "Se connecter"
              : "S'inscrire"}
          </button>
        </form>

        <p className="text-center mt-3">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <button
            onClick={toggleMode}
            className="btn btn-link p-0"
            style={{ textDecoration: "none" }}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
}
