var getRobotCode       = require('../services/getRobotCode');
var runCode            = require('../services/runCode');

// This function take a robot
// the state of the world
// and returns the desired response
module.exports = function(args) {
  var dbConfig  = args.dbConfig;
  var robot     = args.robot;
  var gameState = args.gameState;

  if (!dbConfig)  throw new Error('dbConfig is required');
  if (!gameState) throw new Error('gameState is required');
  if (!robot)     throw new Error('robot is required');

  var getArgs = {
    dbConfig: dbConfig,
    robotId: robot.id
  }
  return getRobotCode(getArgs)
    .then(function(code) {
      // some robots might not have code in the DB
      if (code) {
        var runArgs = {
          source:     code.source,
          gameState:  gameState,
          robot:      robot
        }
        return runCode(runArgs);
      } else {
        // robot does nothing
        return {};
      }
    })
    .then(function(response) {
      response.robotId = robot.id;
      return response;
    });

}
