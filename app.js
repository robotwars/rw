var express  = require('express')
var app      = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
var gameloop = require('node-gameloop');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// game loop
// start the loop at 5 fps (1000/30ms per frame) and grab its id 
var frameCount = 0;
var id = gameloop.setGameLoop(function(delta) {
	// `delta` is the delta time from the last frame 
	console.log('Hi there! (frame=%s, delta=%s)', frameCount++, delta);
	io.sockets.emit('refresh', {state: frameCount})
}, 1000 / 5);


io.on('connection', function (socket) {
	console.log('connection')
	// create a robot for this user
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

server.listen(3000);