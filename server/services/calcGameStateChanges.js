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

    if(robot.x < 600){
      robot.x = x + 40;
    }else{
      robot.x = 0;
    }

    if(robot.y < 600) {
      robot.y = y + 40;
    }else{
      robot.y = 0;
    }
  });

  gameState.robots = robots;
  return gameState;
}
