var _ = require('lodash');

module.exports = function(args) {
  var gameState = args.gameState;
  var robot     = args.robot;

  if (!gameState)         throw new Error('makeInputForRobot : gameState is expected');
  if (!gameState.robots)  throw new Error('makeInputForRobot : gameState.robots is expected');
  if (!robot)             throw new Error('makeInputForRobot : robot is expected');
  if (!robot.id)          throw new Error('makeInputForRobot : robot.id is expected');

  function buildRadarRobots() {
    return _(gameState.robots)
      .reject(function(otherRobot) {
        return robot.id === otherRobot.id
      })
      .map(function(otherRobot) {
        return {
          x: otherRobot.x - robot.x,
          y: otherRobot.y - robot.y
        }
      })
      .reject(function(otherRobot) {
        return otherRobot.x > 3 || otherRobot.y > 3;
      })
      .value();
  }

  function buildRadarWalls() {
    return {
      0:   robot.y - 0,
      90:  gameState.x - robot.x,
      180: gameState.y - robot.y,
      270: robot.x - 0
    }
  }

  function buildRadar() {
    return {
      robots: buildRadarRobots(),
      walls:  buildRadarWalls()
    }
  }

  function buildState() {
    return {
      health: robot.health
    }
  }

  return {
    radar: buildRadar(),
    status: buildState()
  }
}
