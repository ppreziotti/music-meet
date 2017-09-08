module.exports = function(app) {
	// Main page route
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/", "index.html"));
	});
	// Discover page route
	app.get('/discover', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/", "discover.html"));
	});
	// Login page route
	app.get('/login', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/", "login.html"));
	});
	// Signup page route
	app.get('/signup', function(req, res) {
		res.sendFile(path.join(__dirname, "../public/", "signup.html"));
	});
}