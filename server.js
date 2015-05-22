var express  = require('express')
var app      = express();
var handleSockets = require('./server/handleSockets.js');
var handleGameLoop = require('./server/handleGameLoop.js');

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

var io = require('socket.io')(server);

handleSockets(io);
handleGameLoop(io);
