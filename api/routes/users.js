const express = require('express'); //stała przechowująca 'express'
const router = express.Router(); //wyciągnięcie ze stała 'express' funkcji Router()
const UserContoller = require('../controllers/users_controller'); //odwołanie do kontrolera Userów
const checkAuth = require('../middleware/check-auth'); //odwołanie do js 'check-auth'

router.post('/signup', UserContoller.user_signup); //metoda POST pozwalająca na rejestracje
router.delete('/:userId',checkAuth, UserContoller.user_delete); 
//^metoda DELETE pozwalająca na usunięcie konta
//dodatkowo, wymagany jest poprawny token aby to wykonać
router.post('/login', UserContoller.user_login); //metoda POST pozwalająca na logowanie

module.exports = router;
