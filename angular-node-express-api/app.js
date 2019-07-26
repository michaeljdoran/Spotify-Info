var express = require('express'); // Express web server framework
var bodyParser = require('body-parser');
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));
require('./routes')(app, {});

console.log('Listening on 3000');
app.listen(3000);