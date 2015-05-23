// var saveUserInfo = require('.')

var SessionSockets = require('session.socket.io');

module.exports = function(config) {
  var io             = config.io;
  // var cookieParser   = config.cookieParser;
  // var sessionsStore  = config.sessionsStore;
  // var sessionSockets = new SessionSockets(io, sessionsStore, cookieParser, 'yourOwnSessionStoreKey');

  // user connected
  io.on('connection', function(socket) {
  // sessionSockets.on('connection', function(err, socket, session) {
    var sockerId = socket.id;
    // console.log(session);

    console.log('user connected', sockerId);

    // Send a session token to the user
    // create a robot for this user
    // socket.emit('news', { hello: 'world' });

    socket.on('user:info:updated', function(data) {
      console.log(data.info, socket.id);
    })

    socket.on('user:code:updated', function(data) {
      console.log(data.code, socket.id);
    })

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });

}
