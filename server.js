// modules =================================================
var express        = require('express');
var app            = express();
var debug          = require('debug');
var http           = require('http');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var busboy = require('connect-busboy');

// configuration ===========================================
	
//DB CONFIG
var mongoURL = 'dev:dev@ds033116.mlab.com:33116/cmpe133_fall16_network'
//var mongoURL = 'mongodb://localhost:27017/test';
var port = process.env.PORT || 8080; // set our port

var db = mongoose.connect(mongoURL).connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connection ready"); // connect to our mongoDB database (commented out after you enter in your own credentials)
});

// get all data/stuff of the body (POST) parameters

app.use(busboy()); 
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
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});


/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io').listen(server);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

var publicMessageSocket = require('./app/socket/PublicMessageSocket');


io.on('connection', function(socket) {
   console.log("websocket connection build");
   publicMessageSocket.publicMessage(socket);
});

exports = module.exports = app; 						// expose app