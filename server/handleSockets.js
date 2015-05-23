var createRobot  = require('./services/createRobot');
var saveRobot    = require('./services/saveRobot');
var getRobot     = require('./services/getRobot');

module.exports = function(config) {
  var io             = config.io;
  var dbConfig       = config.dbConfig;

  // user connected
  io.on('connection', function(socket) {

    var sockerId = socket.id;
    var userId = socket.request.session.id;

    // console.log('user connected, sockerId', sockerId);
    // console.log('sessionId', userId);

    // Create the robot if necessary
    createRobot(dbConfig, userId);

    // get the stored robot for the user
    // and send it
    getRobot(dbConfig, userId)
      .then(function(robot) {
        console.log(robot);
        socket.emit('server:robot:retrieved', robot);
      });

    // Send a session token to the user
    // create a robot for this user
    // socket.emit('news', { hello: 'world' });

    // Handle events from the user

    socket.on('user:info:updated', function(data) {
      // console.log(data.info, socket.id);
      saveRobot(dbConfig, userId, data.info);
    })

    socket.on('user:code:updated', function(data) {
      console.log(data.code, socket.id);
    })

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });

}
