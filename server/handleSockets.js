var bluebird      = require('bluebird');
var createRobot   = require('./services/createRobot');
var getRobot      = require('./services/getRobot');
var saveRobot     = require('./services/saveRobot');
var getRobotCode  = require('./services/getRobotCode');
var handleSocketUserCodeUpdated = require('./services/handleSocketUserCodeUpdated');

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
    var args = {
      dbConfig: dbConfig,
      robotId: userId
    };

    createRobot(args);

    // get the stored robot for the user
    // and send it
    var gr = getRobot(args);
    var gc = getRobotCode(args);

    bluebird.join(gr, gc).then(function(results) {
        var robot = results[0];
        var code = results[1];
        socket.emit('server:robot:retrieved', robot, code);
      });

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
      console.log('user disconnected');
    });
  });
}
