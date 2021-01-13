Stworzyliśmy stację pogodową w API, dzięki której 
możemy wprowadzać dane z wybranych stacji meteorologicznych.
Program umożliwia wyświetlanie stacji i ich szczegółów oraz ich modyfikację.
Pozwala także na dodawanie nowych obserwacji meteorologicznych, 
jak i usuwanie ich ze stacji.
Istnieje możliwość połączenia tego projektu z naszym poprzednim (w Androidzie).
Jako podstawę stworzenia API użyliśmy framework stworzony na zajęciach.





Wykorzystane funkcje, metody itp.:

mongoose - możliwość zintegrowania API z mongoDB
const Station = require('../models/station'); - stała przechowująca ścieżkę i tym samym model(konstruktor) Stacji

stations_get_all - wyświetlanie wszystkich stacji i ich szczegółów
stations_new - dodawanie nowej obserwacji meteorologicznej
stations_get_by_id - wyświetlanie konkretnej stacji(wyszukiwanej poprzez unikalne ID) i jej szczegółów
stations_change - wprowadzanie zmian do istniejących już stacji
stations_delete - usuwanie obserwacji ze stacji

_id: mongoose.Types.ObjectId - unikalne id generowane przez wbudowaną funkcję mongoose
module.exports = mongoose.model('Station', stationSchema); - eksport modelu Station

Express - stała przechowująca Expressa, czyli frameworka pod Node.js
const router = express.Router(); - wyciągnięcie ze Expressa funkcji Router()
const StationsController = require('../controllers/stations_controller'); - odwołanie do js 'stations_controller'
const checkAuth = require('../middleware/check-auth'); - odwołanie do js 'check-auth'

router.get('/', checkAuth, StationsController.stations_get_all); - metoda GET wypisująca wszystkie stacje+szczegóły
router.post('/create', checkAuth, StationsController.stations_new); - metoda POST pozwalająca dodać nową obserwacje
router.get('/:stationID', checkAuth, StationsController.stations_get_by_id); - metoda GET wypisująca konkretną stacje+jej szczegóły
router.patch('/:stationID', checkAuth, StationsController.stations_change); - metoda PATCH pozwalająca edytować konkretną stacje
router.delete('/:stationID', checkAuth, StationsController.stations_delete); - metoda PATCH pozwalająca usunąć konkretną stacje

router.post('/signup', UserContoller.user_signup); - metoda POST umożliwia rejestracje
router.delete('/:userId',checkAuth, UserContoller.user_delete); - metoda DELETE pozwalająca na usunięcie konta
router.post('/login', UserContoller.user_login); - metoda POST umożliwia logowanie


user_signup - kontroler odpowiedzialny za rejestracje
user_delete - kontroler odpowiedzialny za usunięcie konta
user_login - kontroler odpowiedzialny za logowanie i wygenerowanie tokenu JWT
