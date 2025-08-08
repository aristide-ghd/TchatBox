import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "./toast";

const API_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    motDePasse: "",
    pseudo: "",
    sexe: "Homme",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
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

        setToast({ message: "Connexion réussie ! Vous serez redirigé...", type: "success" });

        setTimeout(() => {
          navigate("/chat");
        }, 3000);
      }
    } else {
      setToast({ message: "Inscription réussie ! Vous pouvez maintenant vous connecter.", type: "success" });
      setIsLogin(true);
    }

  } catch (err) {
    console.error("Erreur lors de la requête :", err);
    setToast({ message: err.response?.data?.message || "Erreur inconnue", type: "error" });
  }

  setLoading(false);
};

return (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="card shadow-lg overflow-hidden" 
      style={{ maxWidth: "900px", width: "95%" }}>
      <div className="row g-0">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        
        {/* Colonne image */}
        <div className="col-md-6 d-none d-md-block bg-light bg-opacity-10">
          <div className="h-100 d-flex align-items-center justify-content-center p-4">
            <img 
              src={isLogin 
                ? "https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg" 
                : "https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg"} 
              alt={isLogin ? "Illustration connexion" : "Illustration inscription"} 
              className="img-fluid rounded-3"
              style={{ objectFit: "contain", height: "100%", maxHeight: "400px" }}
            />
          </div>
        </div>
        
        {/* Colonne formulaire */}
        <div className="col-md-6">
          <div className="p-4 p-lg-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary mb-3">
                {isLogin ? "Connexion" : "Inscription"}
              </h2>
              <p className="text-muted">
                {/* {isLogin 
                  ? "Content de vous revoir ! Connectez-vous à votre compte." 
                  : "Rejoignez notre communauté dès maintenant."} */}
                {isLogin 
                  ? "Connectez-vous à TchatBox - Retrouvez vos conversations" 
                  : "Rejoignez TchatBox - Discutez avec vos amis en 1 clic"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label htmlFor="pseudo" className="form-label fw-medium">
                      Pseudo <span className="text-danger">*</span>
                    </label>
                    <input
                      id="pseudo"
                      type="text"
                      name="pseudo"
                      value={form.pseudo}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Votre nom d'utilisateur"
                      required
                    />
                    <div className="invalid-feedback">Veuillez choisir un pseudo</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium d-block">
                      Genre <span className="text-danger">*</span>
                    </label>
                    <div className="btn-group w-100" role="group">
                      {['Homme', 'Femme', 'Autre'].map((option) => (
                        <React.Fragment key={option}>
                          <input
                            type="radio"
                            className="btn-check"
                            name="sexe"
                            id={`sexe-${option}`}
                            value={option}
                            checked={form.sexe === option}
                            onChange={handleChange}
                            required
                          />
                          <label 
                            className={`btn btn-outline-primary ${form.sexe === option ? 'active' : ''}`}
                            htmlFor={`sexe-${option}`}
                          >
                            {option}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-medium">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="exemple@domaine.com"
                  required
                />
                <div className="invalid-feedback">
                  Veuillez entrer une adresse email valide
                </div>
                {!isLogin && (
                  <div className="form-text text-muted">Nous ne partagerons jamais votre email</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="motDePasse" className="form-label fw-medium">
                  Mot de passe <span className="text-danger">*</span>
                </label>
                <div className="input-group has-validation">
                  <input
                    id="motDePasse"
                    type={showPassword ? "text" : "password"}
                    name="motDePasse"
                    value={form.motDePasse}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={isLogin ? "Votre mot de passe" : "Créez un mot de passe"}
                    required
                    minLength={isLogin ? undefined : 8}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                  <div className="invalid-feedback">
                    {isLogin ? "Mot de passe requis" : "Minimum 8 caractères requis"}
                  </div>
                </div>
                {!isLogin && (
                  <div className="form-text text-muted">
                    Minimum 6 caractères - inclure chiffres et caractères spéciaux
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Se souvenir de moi
                    </label>
                  </div>
                  <a href="/mot-de-passe-oublie" className="text-decoration-none">
                    Mot de passe oublié ?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className={`btn btn-primary w-100 py-2 fw-bold ${loading ? "disabled" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    {isLogin ? "Connexion en cours..." : "Inscription en cours..."}
                  </>
                ) : isLogin ? (
                  "Se connecter"
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <p className="text-muted mb-2">
                {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}
              </p>
              <button
                type="button"
                onClick={toggleMode}
                className="btn btn-link text-decoration-none p-0"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}