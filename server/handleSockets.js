var bluebird      = require('bluebird');
var createRobot   = require('./services/createRobot');
var getRobot      = require('./services/getRobot');
var saveRobot     = require('./services/saveRobot');
var getRobotCode  = require('./services/getRobotCode');
var saveRobotCode = require('./services/saveRobotCode');
var verifyCode    = require('./services/verifyCode.js');

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
    var gr = getRobot(dbConfig, userId);
    var gc = getRobotCode(dbConfig, userId);

    bluebird.join(gr, gc).then(function(results) {
        var robot = results[0];
        var code = results[1];
        socket.emit('server:robot:retrieved', robot, code);
      });

    // Handle events from the user

    // When user updated information about their robot
    socket.on('user:robot:updated', function(data) {
      // console.log(data.info, socket.id);
      saveRobot(dbConfig, userId, data.robot)
        .then(function() {
          console.log('Robot Saved')
        });
    })

    // User has updated and hit save on the code editor
    socket.on('user:code:updated', function(data) {
      var source = data.source;

      verifyCode(source)
        .then(function() {
          // If the code is good, then save it in the db
          return saveRobotCode(dbConfig, userId, source);
        })
        .then(function() {
          // Return a success message to the user
          console.log('Code is good, saving');
          var message = {
            kind:  'success',
            value: 'Saved'
          }
          socket.emit('server:message', message);
        })
        .catch(function(err) {
          // Return a error message to the user
          var message = {
            kind: 'error',
            value: err.toString()
          }
          socket.emit('server:message', message);
          // console.log(err);
        });

      // saveRobotCode(dbConfig, userId, source)
      //   .then(function() {
      //     socket.emit('server:code:saved');
      //   });
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
}
