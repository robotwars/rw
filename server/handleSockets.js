// var saveUserInfo = require('.')

module.exports = function(config) {
  var io             = config.io;

  // user connected
  io.on('connection', function(socket) {

    var sockerId = socket.id;

    console.log(socket.request.session);

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
