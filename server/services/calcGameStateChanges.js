var _ = require('lodash');

/*
This module takes the current game state
The robots
And the responses from the robots

And calculates the new state for the robots
*/

module.exports = function(args) {
  if (!args.responses)     throw new 'response is required';
  if (!args.prevGameState) throw new 'prevGameState is required';
  if (!args.prevGameState.robots) throw new 'prevGameState.robots is required';

  // TODO
  const gameState = args.prevGameState;
  const robots    = args.prevGameState.robots;

  _.each(robots, function(robot) {
    var x = robot.x || 0;
    var y = robot.y || 0;

    robot.x += 1;
    robot.y += 1;

    if (robot.x > gameState.x) robot.x = 0;
    if (robot.x < 0) robot.x = gameState.x;
    if (robot.y > gameState.y) robot.y = 0;
    if (robot.y < 0) robot.y = gameState.y;
  });

  gameState.robots = robots;
  return gameState;
}
