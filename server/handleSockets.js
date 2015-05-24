var saveRobot                   = require('./services/saveRobot');
var handleSocketUserCodeUpdated = require('./services/handleSocketUserCodeUpdated');
var handleSocketDisconnected    = require('./services/handleSocketDisconnected');
var handleSocketConnected       = require('./services/handleSocketConnected');

module.exports = function(config) {
  var io             = config.io;
  var dbConfig       = config.dbConfig;

  // user connected
  io.on('connection', function(socket) {

    var sockerId = socket.id;
    var userId = socket.request.session.id;

    // Create the robot if necessary
    var args = {
      dbConfig: dbConfig,
      socket: socket,
      robotId: userId
    };
    handleSocketConnected(args);

    // Handle events from the user

    // When user updated information about their robot
    socket.on('user:robot:updated', function(data) {
      // console.log(data.info, socket.id);
      var saveArgs = {
        dbConfig: dbConfig,
        robotId:  userId,
        robot:    data.robot
      }
      saveRobot(saveArgs)
        .then(function() {
          console.log('Robot Saved')
        });
    })

    // User has updated and hit save on the code editor
    socket.on('user:code:updated', function(data) {
      var args = {
        data: data,
        socket: socket,
        dbConfig: dbConfig,
        robotId: userId
      }
      return handleSocketUserCodeUpdated(args)
    });

    socket.on('disconnect', function() {
      var args = {
        socket: socket,
        dbConfig: dbConfig,
        robotId: userId
      }
      return handleSocketDisconnected(args);
    });
  });
}
