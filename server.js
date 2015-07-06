// sortd web app root file

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname));
var port = process.env.PORT || 6969;
require(path.join(__dirname, './app/routes.js'))(app);

app.listen(port);
console.log("sortd startd listening on: " + port);
