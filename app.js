const express = require('express'); //stała przechowująca 'express'
const morgan = require('morgan'); //stała przechowująca 'morgan'
const bodyParser = require('body-parser'); //stała przechowująca body parser
const mongoose = require('mongoose'); //stała przechowująca 'mongoose'
const app = express(); //przypisanie stałej 'app' expressa 
const stationRoutes = require('./api/routes/stations'); //stała przechowująca lokalizacje stations.js
const userRoutes = require('./api/routes/users'); //stała przechowująca lokalizacje users.js

mongoose.connect( //połączenie z bazą danych mongoDB
    'mongodb+srv://user1:'+
    process.env.hasloDB +
    '@cluster0.fhzhv.mongodb.net/stacja?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/stations', stationRoutes);
app.use('/users', userRoutes);

//obsługa błędów

app.use((req, res, next) => {
  const error = new Error('Nie odnaleziono takiej stacji');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ wiadomość: error.message });
});

module.exports = app;
