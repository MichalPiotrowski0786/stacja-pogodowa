const mongoose = require('mongoose'); //stała przechowująca 'mongoose'

//w tym js definiowany jest schemat usera(użytkownika). 

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId, //unikalne id generowane przez wbudowaną funkcję mongoose
  email: { //zmienna otrzymująca email użytkownika
    type: String,
    required: true, //wymagany
    unique: true, //musi być unikalny tj. jeden na bazę danych
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //wpisany przez użytkownika string musi spełniać te reguły
  },
  password: { //zmienna otrzymująca hasło
    type: String,
    required: true, //wymagane
  },
});

module.exports = mongoose.model('User', userSchema); //eskport modelu 'User'
