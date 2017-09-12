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
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({'email': email}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, false, req.flash('signupMessage', 'Email address has already been used.'));
				}
				else {
					var newUser = new User();
					newUser.email = email;
					newUser.password = newUser.generateHash(password);
					// Need to add username, location, and favorite artists
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
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		User.findOne({email: email}, function(err, user) {
			if (err) {
				return done (err);
			}
			if (!user) {
				return done(null, false, req.flash('loginMessage', 'Email address not found.'));
			}
			if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
			}
			return done(null, user);
		});
	}));
};