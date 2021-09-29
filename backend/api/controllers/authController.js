const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    "secret"
  );

  return accessToken;
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!user) res.status(400).json({ error: "El usuario no existe" });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Usuario / contraseña no validos!" });
      } else {
        const accessToken = createTokens(user);
        res.json({
          auth: true,
          token: accessToken,
          user
        });
      }
    });

    // res.status(200).json(user);
  });
};