var _ = require('lodash');

/*
This module takes the current game state
The robots
And the responses from the robots

And calculates the new state for the robots
*/




module.exports = function(args) {

  // Go get our robot
  function findRobot(robot){
    var robot = _.find(args.responses,function(r){
      return r.robotId == robot.id;
    })
    return robot;
  }

  // Is there a robot at this position
  function findRobotAtPos(robots, x, y){
    var robot = _.find(robots,function(r){
      return r.x == x && r.y == y;
    })
    return robot;
  }
  

  if (!args.responses)     throw new 'response is required';
  if (!args.prevGameState) throw new 'prevGameState is required';
  if (!args.prevGameState.robots) throw new 'prevGameState.robots is required';

  // TODO
  const gameState = args.prevGameState;
  const robots    = args.prevGameState.robots;

  _.each(robots, function(robot) {
    var x = robot.x || 0;
    var y = robot.y || 0;

    var response = findRobot(robot)
    console.log("RESPONSE", response)

    // Transfer the logs over to the robot object
    robot.logs = response.logs;
    
    // look at the move and change x, y accordingly
    if(response.bearTo == 0){
      if(response.move > 0){
        robot.y -= 1;
      }else if(response.move < 0 && robot.y != gameState.y){
        robot.y += 1;
      }
    }else if(response.bearTo == 90){
      if(response.move > 0 && robot.x != gameState.x){
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
    var robotEnemy = findRobotAtPos(robots, robot.x + 1,robot.y)
    console.log("ROBOTENEMY ---> ", robotEnemy)
    if(robotEnemy){
      console.log("-------You are about to RAM a robot")
      robot.x = robot.x - 1;
      robot.actions = ["RAM"]
    }else{
      robot.actions = []
    }

    // weapons!!! Let's start with saw.
    if(response.aimTo == 90){
      console.log("Attack robot to the right with weapon: ", response.useWeapon)
    }

    // detect which weapon is in use & which direction and if there is a robot in there

    // if there a robot where that robot is attacking take health off other robot

    
    // Check boundaries
    if (robot.x > gameState.x) robot.x = gameState.x - 1;
    if (robot.x < 0) robot.x = 0;
    if (robot.y > gameState.y) robot.y = gameState.y;
    if (robot.y < 0) robot.y = 0;
  });

  gameState.robots = robots;
  return gameState;
}
