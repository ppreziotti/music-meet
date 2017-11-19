var User = require('../models/User.js');

module.exports = function(app, passport) {
	// Main page route
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});
	// Discover page route
	app.get('/discover', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/", "discover.html"));
	});
	// Login page route
	app.get('/login', function(req, res) {
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	// Logout route
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	// Profile page route - can only view once logged in
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user: req.user
		});
	});
	// Function to determine if a user is logged in or not
	function isLoggedIn(req, res, next) {
		// Allow the user to continue if authenticated in the session
		if (req.isAuthenticated()) {
			return next();
		}
		// Otherwise, redirect to the home page for login
		res.redirect('/');
	}
	// Signup page route
	app.get('/signup', function(req, res) {
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});
	// Signup post route
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));
	// Login post route
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));
	// Post route for searching for friends
	app.post('/search', function(req, res) {
		User.findOne({location: req.body.location}, function(error, user) {
			if (error) {
				res.send(error);
			}
			else if (user) {
				res.render('search', {
					user: user
				});
			}
			else {
				res.render('profile');
			}
		});
	});
};