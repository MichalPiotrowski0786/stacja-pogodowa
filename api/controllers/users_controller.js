const mongoose = require('mongoose'); //stała przechowująca 'mongoose'
const User = require('../models/user'); //stała przechowująca ścieżkę i tym samym model(konstruktor) Usera
const bcrypt = require('bcrypt'); //stała przechowująca 'bcrypt'
const jwt = require('jsonwebtoken'); //stała przechowująca 'JWT'

exports.user_signup = (req, res, next) => { //kontroler odpowiedzialny za rejestracje
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ wiadomość: err });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then((user) => {
            res.status(201).json({
              wiadomość: 'Stworzono konto',
              info: user,
            });
          })
          .catch((err) => res.status(500).json({ wiadomość: err.info }));
        }
    });
};

exports.user_delete = (req, res, next) => { //kontroler odpowiedzialny za usunięcie konta
    User.remove({ _id: req.params.userId })
    .then((user) => {
        res.status(200).json({ wiadomość: 'Usunięto konto' });
    })
    .catch((err) => res.status(500).json({ wiadomość: err }));
};

exports.user_login = (req, res, next) => { //kontroler odpowiedzialny za logowanie i wygenerowanie tokenu JWT
    User.findOne({ email: req.body.email })
    .then((user) => {
        if (!user) {
          res.status(401).json({ wiadomość: 'Błąd autoryzacji' });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
            res.status(500).json({ wiadomość: err });
        }
        if (result) {
            //stworzenie JWT
            const token = jwt.sign(
            {
                email: user.email,
                userId: user._id,
            },
            process.env.hasloJWT,
            {
                expiresIn: "1h" //token wygasa godzine od logowania
            });
            res.status(200).json({
              wiadomość: 'Zalogowano użytkownika',
              token: token
            });
        } else {
            res.status(401).json({ wiadomość: 'Błąd przy logowaniu' });
        }});
    })
    .catch((err) => res.status(500).json({ wiadomość: err }));
};