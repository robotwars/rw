var _ = require('lodash');

module.exports = function(args) {
  var gameState = args.gameState;
  var robot     = args.robot;

  if (!gameState)         throw new Error('gameState is expected');
  if (!gameState.robots)  throw new Error('gameState.robots is expected');
  if (!robot)             throw new Error('robot is expected');
  if (!robot.id)          throw new Error('robot.id is expected');

  function buildRadar() {

    var robots = _(gameState.robots)
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
    return {
      robots: robots
    }
  }

  function buildState() {
    return {
      health: robot.health
    }
  }

  // TODO calc the inputs for the robot
  return {
    radar: buildRadar(),
    status: buildState()
  }
}
