// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');


// configuration ===========================================
	
//DB CONFIG
var mongoURL = 'dev:dev@ds033116.mlab.com:33116/cmpe133_fall16_network'
var port = process.env.PORT || 8080; // set our port

var db = mongoose.connect(mongoURL).connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connection ready"); // connect to our mongoDB database (commented out after you enter in your own credentials)
});

/*
var forumSchema = require('./app/models/Forum.js');
var discussion = mongoose.model('Forum', forumSchema);

var createForum = new discussion({
				title: "LinkedIn or LinkedOut?", 
				forumOwner: "58123f3d1cdd73d423e93971", 
				date: "July 27, 2016", 
				description:"Default content",
				comments : [{   commentOwner : "58159b516d7744982fb036d4",
								date : "October 26, 2016",
								description : "#1troll strikes with some spams",
								reply : [{ replyOnwer : "58123f3d1cdd73d423e93971",
											date : "October 26, 2016",
											description : "OMG..."}]},
							{ commentOwner : "58159b516d7744982fb036d4",
								date : "October 26, 2016",
								description : "some more spams",
								reply : [{ replyOnwer : "58123f3d1cdd73d423e93971",
											date : "October 26, 2016",
											description : "STAHP"}]},
							{ commentOwner : "58159b516d7744982fb036d4",
								date : "October 26, 2016",
								description : "and a bit more than some more spams"}]
});

createForum.save(function (err, createForum) {
  if (err) 
	  return console.error(err);
  else
	  return console.log("INSERTED DATA INTO DB");
});
*/



// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.use('/api', require('./app/ApiController'));
	
	
	
	// frontend routes =========================================================
	// route to handle all angular requests	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app