const express = require('express'); //stała przechowująca 'express'
const router = express.Router(); //wyciągnięcie ze stała 'express' funkcji Router()
const StationsController = require('../controllers/stations_controller'); //odwołanie do js 'stations_controller'
const checkAuth = require('../middleware/check-auth'); //odwołanie do js 'check-auth'

    //metoda GET wypisująca wszystkie stacje+szczegóły
router.get('/', checkAuth, StationsController.stations_get_all);
    //metoda POST pozwalająca dodać nową obserwacje
router.post('/create', checkAuth, StationsController.stations_new); 
    //metoda GET wypisująca konkretną stacje+jej szczegóły
router.get('/:stationID', checkAuth, StationsController.stations_get_by_id); 
    //metoda PATCH pozwalająca edytować konkretną stacje
router.patch('/:stationID', checkAuth, StationsController.stations_change);
    //metoda PATCH pozwalająca usunąć konkretną stacje
router.delete('/:stationID', checkAuth, StationsController.stations_delete);

module.exports = router;
