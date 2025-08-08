import React from "react";
import { useNavigate } from "react-router-dom";

function Accueil() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/loginRegister");
  };

  // Styles inline avec des variables JavaScript
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '1rem'
    },
    card: {
      maxWidth: '650px',
      width: '95%',
      borderRadius: '1.5rem',
      borderTop: '5px solid #0d6efd',
      padding: '2rem',
      background: 'white',
      boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
      textAlign: 'center'
    },
    illustration: {
      maxHeight: '180px',
      filter: 'drop-shadow(0 5px 15px rgba(13, 110, 253, 0.2))',
      animation: 'float 3s ease-in-out infinite',
      marginBottom: '1.5rem'
    },
    primaryButton: {
      borderRadius: '50px',
      transition: 'all 0.3s ease',
      border: 'none',
      background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)',
      padding: '0.75rem 2rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem'
    },
    secondaryButton: {
      borderRadius: '50px',
      border: '1px solid #0d6efd',
      padding: '0.75rem 2rem',
      color: '#0d6efd',
      background: 'transparent'
    },
    featureCard: {
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: '#f8f9fa',
      height: '100%'
    },
    footer: {
      marginTop: '2rem',
      paddingTop: '1rem',
      borderTop: '1px solid #dee2e6',
      color: '#6c757d',
      fontSize: '0.875rem'
    }
  };

  // Animation CSS-in-JS
  const floatAnimation = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `;

  return (
    <>
      <style>{floatAnimation}</style>
      
      <div style={styles.container}>
        <div style={styles.card}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/9068/9068750.png"
            alt="Discussion Illustration"
            style={styles.illustration}
          />
          
          <h1 style={{ 
            color: '#212529',
            fontWeight: 'bold',
            marginBottom: '1rem',
            fontSize: '2.5rem'
          }}>
            Bienvenue sur <span style={{
              background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>TchatBox</span> 👋
          </h1>
          
          <p style={{
            color: '#6c757d',
            fontSize: '1.25rem',
            marginBottom: '2rem',
            lineHeight: '1.5'
          }}>
            Échangez librement avec vos proches, en toute simplicité et rapidité.
          </p>

          <div style={{
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={handleStart}
              style={styles.primaryButton}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              🚀 Démarrer
            </button>

            <button style={styles.secondaryButton}>
              📱 Télécharger l'app
            </button>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {[
                { icon: '⚡', title: 'Rapide', desc: 'Messages instantanés' },
                { icon: '🔒', title: 'Sécurisé', desc: 'Chiffrement E2E' },
                { icon: '😊', title: 'Intuitif', desc: 'Interface simple' }
              ].map((feature, index) => (
                <div key={index} style={styles.featureCard}>
                  <div style={{ 
                    fontSize: '2rem',
                    marginBottom: '0.5rem'
                  }}>{feature.icon}</div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>{feature.title}</h3>
                  <p style={{
                    color: '#6c757d',
                    fontSize: '0.875rem',
                    margin: 0
                  }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.footer}>
            <p style={{ margin: 0 }}>
              TchatBox - Conversations instantanées et sécurisées depuis 2023
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Accueil;