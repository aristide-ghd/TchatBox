const { object, string, boolean, array } = require('yup');
const { default: mongoose } = require('mongoose');

const userDto = object({
  body: object({
    pseudo: string()
      .required('Le pseudo est requis'),

    email: string()
      .email('L\'email est invalide')
      .required('L\'email est requis'),

    motDePasse: string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .nullable(),
      
    sexe: string()
      .oneOf(['Homme', 'Femme'])
      .required('Le sexe est requis'),
  }),
});

const connexionDto = object({
    body: object({
        email: string()
            .email('L\'email est invalide')
            .required('L\'email est requis'),
        motDePasse: string()
            .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
            .required('Le mot de passe est requis'),
    }),
});

const messageDto = object({
  body: object({
    senderId: string()
      .required("L'identifiant de l'expéditeur est requis"),

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