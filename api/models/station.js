const mongoose = require('mongoose'); //stała przechowująca 'mongoose'

//w tym js definiowany jest schemat Stacji(obserwacji). 

const stationSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId, //unikalne id generowane przez wbudowaną funkcję mongoose
  miejscowosc: { //zmienna otrzymująca nazwę miejscowości
    type : String, 
    required: true, //wymagane
  },
  t: { //zmienna otrzymująca wartość temperatury
    type: Number,
    required: true, //wymagane
  },
  dw: { //zmienna otrzymująca wartość punktu rosy
    type: Number,
    required: true, //wymagane
  },
  data: Date //zmienna otrzymująca obecną datę UTC
});

module.exports = mongoose.model('Station', stationSchema); //eksport modelu 'Station'
