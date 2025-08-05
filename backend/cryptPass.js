const bcrypt = require("bcrypt");

const motDePasse = "";

bcrypt.hash(motDePasse, 10, function(err, hash) {
  if (err) throw err;
  console.log("Mot de passe hashé :", hash);
});
