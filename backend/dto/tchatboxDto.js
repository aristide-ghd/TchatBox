const { object, string, boolean, array } = require('yup');
const { default: mongoose } = require('mongoose');

const userDto = object({
  body: object({
    pseudo: string()
      .required('Le pseudo est requis'),

    email: string()
      .required('L\'email est requis')
      .email('L\'email est invalide'),

    motDePasse: string()
      .required('Le mot de passe est requis')
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
      
    sexe: string()
      .required('Le sexe est requis')
      .oneOf(['Homme', 'Femme']),
  }),
});

const connexionDto = object({
    body: object({
        email: string()
          .required('L\'email est requis')
          .email('L\'email est invalide'),

        motDePasse: string()
          .required('Le mot de passe est requis')
          .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    }),
});

const messageDto = object({
  body: object({
    receivedId: string()
      .nullable(), // Peut être null pour les messages publics

    content: string()
      .required("Le contenu du message est requis")
      .max(1000, "Le message ne doit pas dépasser 1000 caractères"),
  }),
});

module.exports = {
  userDto,
  connexionDto,
  messageDto
};