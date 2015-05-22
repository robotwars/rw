var express  = require('express')
var app      = express();
var gameloop = require('node-gameloop');

// serve static assets
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + 'public/index.html');
});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});

var io       = require('socket.io')(server);

// game loop
// start the loop at 5 fps (1000/30ms per frame) and grab its id
var frameCount = 0;
var id = gameloop.setGameLoop(function(delta) {
  // `delta` is the delta time from the last frame
  frameCount++;
  // console.log('Hi there! (frame=%s, delta=%s)', frameCount++, delta);
  io.sockets.emit('refresh', {state: frameCount})
}, 1000 / 5);

// user connected
io.on('connection', function(socket) {
  console.log('connection')
  // create a robot for this user
  socket.emit('news', { hello: 'world' });

  socket.on('codeupdate', function(data) {
    console.log(data.code)
  })

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
