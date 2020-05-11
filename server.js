const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const http = require('http');
const mysqlConnection = require("./connection.js");
var router = express.Router();
var session = require('express-session');
var logger = require('morgan'); //utilisateurs login
var cookieParser = require('cookie-parser');



//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(__dirname + '/public')) //pour utiliser le css en local (fichiers statiques)



//app.use('/', routesUsers);
let routesUsers = require("./routes/RoutesSkins");
app.use('/', routesUsers);
// Server Listening
app.listen(3000, () => {
    console.log('I am feeling great on port 3000');
});

 
