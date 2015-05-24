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
    
    var response = _.find(args.responses,function(r){
      return r.robotId == robot.id;
    })

    console.log("RESPONSE", response.move)
    
    // look at the move and change x, y accordingly
    if(response.bearTo == 0){
      if(response.move > 0){
        robot.y -= 1;
      }else if(response.move < 0 && robot.y != (gameState.y - 1)){
        robot.y += 1;
      }
    }else if(response.bearTo == 90){
      if(response.move > 0){
        robot.x += 1;
      }else if(response.move < 0){
        robot.x -= 1;
      }
    }else if(response.bearTo == 180){
      if(response.move > 0){
        robot.y += 1;
      }else if(response.move < 0){
        robot.y -= 1;
      }
    }else if(response.bearTo == 270){
      if(response.move > 0){
        robot.x -= 1;
      }else if(response.move < 0){
        robot.x += 1;
      }
    }

    // colision detection and move back & take health off both (call this a RAM!)



    // weapons!!! Let's start with saw.

    // detect which weapon is in use & which direction and if there is a robot in there

    // if there a robot where that robot is attacking take health off other robot

    
    // Check boundaries
    if (robot.x > gameState.x) robot.x = gameState.x - 1;
    if (robot.x < 0) robot.x = 0;
    if (robot.y > gameState.y) robot.y = gameState.y - 1;
    if (robot.y < 0) robot.y = 0;
  });

  gameState.robots = robots;
  return gameState;
}
