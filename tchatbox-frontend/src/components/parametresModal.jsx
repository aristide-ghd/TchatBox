import React from "react";
import { Modal, Button } from "react-bootstrap";

const ParametresModal = ({ show, handleClose, pseudo, handleLogout }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Paramètres</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Connecté en tant que :</strong> {pseudo}</p>
        <hr />
        <button className="btn btn-outline-primary w-100 mb-2">
          Modifier le profil
        </button>
        <button className="btn btn-outline-secondary w-100 mb-2">
          Notifications
        </button>
        <button className="btn btn-outline-dark w-100 mb-2">
          Changer le thème
        </button>
        <button
          className="btn btn-outline-danger w-100"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParametresModal;
