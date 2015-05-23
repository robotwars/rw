var bluebird              = require('bluebird');
var getAllActiveRobots    = require('../services/getAllActiveRobots');
var makeGameState         = require('../services/makeGameState');
var getRobotResponse      = require('../services/getRobotResponse');
var calcGameStateChanges  = require('../services/calcGameStateChanges');
var saveRobots            = require('../services/saveRobots');

// take the current game state
// calc the new game state
module.exports = function(args) {
  if (!args.dbConfig) throw new Error('dbConfig is required');

  // Get all active robos
  // then build the state of the game with them
  // then get responses from the robots
  // calculate game changes based on robots responses
  // save changes to robots
  // return the changed state

  return getAllActiveRobots(args)
    .then(makeGameStateWithRobots)
    .then(makeGameStateWithResponses)
    .then(calcGameStateChanges)
    .then(saveNewGameState);

  function makeGameStateWithRobots(robots) {
    return makeGameState({robots: robots});
  }

  function makeGameStateWithResponses(currentGameState) {
    var robots = currentGameState.robots;
    // get responses from all robots
    return bluebird.Promise.map(robots, function(robot) {
      var robotArgs = {
        dbConfig:    args.dbConfig,
        gameState:   currentGameState,
        robot:       robot
      };
      // get the desired state for the robot
      return getRobotResponse(robotArgs);
    })
    .then(function(responses) {
      // console.log(responses)
      // [
      //   { bearTo: 0, robotId: '0Y9ziumR1EANP8hs7mH4RDjRtMieBr1V' },
      //   { robotId: '64UkgYwnNEdQcJDjluQ8qwi6qLVDY0PM' }
      // ]
      return {
        prevGameState: currentGameState,
        responses:     responses
      };
    });
  }

  function saveNewGameState(newGameState) {
    console.log(newGameState);

    var saveArgs = {
      dbConfig: args.dbConfig,
      robots:   newGameState.robots
    }
    // save the robots in the new state
    return saveRobots(saveArgs).then(function(dbResponse) {
      return newGameState
    });
  }

}
