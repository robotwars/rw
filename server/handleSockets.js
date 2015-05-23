var createRobot  = require('./services/createRobot');
var saveUserInfo = require('./services/saveUserInfo');

module.exports = function(config) {
  var io             = config.io;
  var dbConfig       = config.dbConfig;

  // user connected
  io.on('connection', function(socket) {

    var sockerId = socket.id;
    var userId = socket.request.session.id;

    // console.log('user connected, sockerId', sockerId);
    // console.log('sessionId', userId);

    // Create the robot
    createRobot(dbConfig, userId);

    // Send a session token to the user
    // create a robot for this user
    // socket.emit('news', { hello: 'world' });

    socket.on('user:info:updated', function(data) {
      // console.log(data.info, socket.id);
      saveUserInfo(userId, data);
    })

    socket.on('user:code:updated', function(data) {
      console.log(data.code, socket.id);
    })

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });

}
