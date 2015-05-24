var createRobot   = require('./createRobot');
var saveRobot     = require('./saveRobot');
var bluebird      = require('bluebird');
var getRobot      = require('./getRobot');
var getRobotCode  = require('./getRobotCode');

module.exports = function(args) {
  var robotId = args.robotId;
  var socket = args.socket;
  var dbConfig = args.dbConfig;

  if (!robotId) throw new Error('robotId is required');
  if (!dbConfig) throw new Error('dbConfig is required');
  if (!socket) throw new Error('socket is required');

  console.log('handleSocketConnected');
  
  // Create the robot if necessary
  createRobot(args);

  // get the stored robot for the user
  // and send it
  var gr = getRobot(args);
  var gc = getRobotCode(args);

  return bluebird.join(gr, gc).then(function(results) {
      var robot = results[0];
      var code = results[1];
      // make the robot active
      socket.emit('server:robot:retrieved', robot, code);

      if (!robot.active) {
        robot.active = true;
        var saveArgs = {
          dbConfig: dbConfig,
          robot: robot
        }
        return saveRobot(saveArgs);
      }

    });
}
