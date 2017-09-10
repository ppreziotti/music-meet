var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.js');

module.exports = function(passport) {
	// Serialize and unserialize users out of session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	// Local signup
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		pasReqToCallback: true
	},
	function(req, username, password, done) {
		process.nextTick(function() {
			User.findOne({'username': username}, function(err, user) {
				if (err) {
					return done (err);
				}
				if (user) {
					return done(null, false, req.flash('signupMessage', 'Username is already taken.'));
				}
				else {
					var newUser = new User();
					newUser.username = username;
					newUser.password = newUser.generateHash(password);
					// Need to add email, location, and favorite artists
					newUser.save(function(err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));
	// Local login
	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done {
		User.findOne({username: username}, function(err, user) {
			if (err) {
				return done (err);
			}
			if (!user) {
				return done(null, false, req.flash('loginMessage', 'User not found.'));
			}
			if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
			}
			return done(null, user);
		});
	}));
};