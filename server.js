// Dependencies
var bodyParser = require('body-parser');
// var db = require('./models');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var User = require('./models/User.js');

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

// Creating the database logging it if successful
mongoose.connect('mongodb://localhost/musicMeet', {
	useMongoClient: true
}).then(function() {
	console.log("Mongoose connection succesful.");
});

// Saving the mongoose connection to the database
var db = mongoose.connection;

// Show any mongoose errors
db.on('error', console.error.bind(console, 'connection error:'));

// Import the API and HTML routes
// require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

app.listen(PORT, function() {
	console.log("App listenting on PORT " + PORT + "!");
});