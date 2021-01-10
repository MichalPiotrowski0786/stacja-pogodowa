const mongoose = require('mongoose'); //stała przechowująca 'mongoose'
const Station = require('../models/station'); //stała przechowująca ścieżkę i tym samym model(konstruktor) Stacji

//kontroler odpowiedzialny za wyświetlanie wszystkich stacji i ich szczegółów
exports.stations_get_all = (req, res, next) => {
  Station.find()
    .then((docs) => {
      res.status(200).json({
        wiadomość: 'Lista wszystkich obserwacji',
        info: docs,
      });
    })
    .catch((err) => res.status(500).json({ wiadomość: err }));
};

//kontroler odpowiedzialny za dodawanie nowej obserwacji meteo
exports.stations_new = (req, res, next) => {
  const stacja = new Station({
    _id: new mongoose.Types.ObjectId(),
    miejscowosc: req.body.miejscowosc,
    t: req.body.t,
    dw: req.body.dw,
    data: new Date,
  });
  stacja
    .save()
    .then((doc) => {
      res.status(200).json({
        wiadomość: 'Dodano nową obserwacje w stacji: '+req.body.miejscowosc,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ wiadomość: err }));
};

//kontroler odpowiedzialny za wyświetlanie konkretnej stacji(wyszukiwanej poprzez unikalne ID) i jej szczegółów
exports.stations_get_by_id = (req, res, next) => {
  const id = req.params.stationID;
  Station.findById(id)
    .then((doc) => {
      res.status(200).json({
        wiadomość: 'Szczegóły obserwacji ze stacji o id ' + id,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ wiadomość: err }));
};

//kontoler odpowiedzialny za wprowadzanie zmian do istniejących już stacji
exports.stations_change = (req, res, next) => {
  const id = req.params.stationID;
  Station.findByIdAndUpdate(
    id,
    {
      miejscowosc: req.body.miejscowosc,
      t: req.body.t,
      dw: req.body.dw,
      data: new Date,
    },
    { new: true }
  )
    .then((doc) => {
      res.status(200).json({
        wiadomość: 'Zmieniono obserwacje ze stacji o id ' + id,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ wiadomość: err }));
};

//kontoler odpowiedzialny za usuwanie obserwacji ze stacji
exports.stations_delete = (req, res, next) => {
  const id = req.params.stationID;
  Station.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json({
        wiadomość: 'Usunięto obserwacje ze stacji o id ' + id,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ wiadomość: err }));
};