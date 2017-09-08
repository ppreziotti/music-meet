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
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	favoriteArtists: {
		type: Array,
		required: true
	}
});

var User = mongoose.model("User", UserSchema);

module.exports = User;