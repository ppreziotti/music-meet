var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		// required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	location: {
		type: String,
		// required: true
	},
	favoriteArtists: {
		type: Array,
		// required: true
	}
});

// Generating a hash for the user's password
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking validity of the password
UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model("User", UserSchema);

module.exports = User;