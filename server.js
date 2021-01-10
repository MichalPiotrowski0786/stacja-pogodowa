const http = require('http'); //stała przechowująca 'http'
const app = require('./app'); //stała przechowująca lokalizacje 'app.js'

const port = process.env.port || 3000; //stała definiująca port jako: 3000

const server = http.createServer(app); //stworzenie serwera

server.listen(port); //nasłuchiwanie przez serwer na porcie ze stałej 'port'
