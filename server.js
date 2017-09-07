// Dependencies
var bodyParser = require('body-parser');
// var db = require('./models');
var express = require('express');
var path = require('path');

// Set up the express app 
var app = express();
var PORT = process.env.PORT || 8080;

// Enable the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Path for static content
app.use(express.static(path.join(__dirname, 'public')));

// Import the API and HTML routes
// require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

app.listen(PORT, function() {
	console.log("App listenting on PORT " + PORT + "!");
});