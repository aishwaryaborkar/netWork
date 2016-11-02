module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.use('/api/*', require('./app/ApiController'));
	
	
	
	// frontend routes =========================================================
	// route to handle all angular requests	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};