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

  // Damanage!
  function damageRobot(robot, damage){
    if(robot.health > 0) {
      robot.health -= damage;
    }else{
      robot.health = 0;
    }
  }

  // colision detection and move back & take health off both (call this a RAM!)
  function ramRobot(robot, x, y){
    var robotEnemy = findRobotAtPos(robots, x, y)
    if(robotEnemy){
      // You just rammed someone!
      robot.actions = ["RAM"]
      damageRobot(robot, 1)
      damageRobot(robotEnemy, 2)
      return robotEnemy
    }else{
      robot.actions = []
    }
  }  

  function moveRight(robot){
    var robotEnemy = ramRobot(robot, robot.x + 1, robot.y)
    if(robotEnemy == undefined){
      robot.x += 1;
    }
  }

  function moveLeft(robot){
    var robotEnemy = ramRobot(robot, robot.x - 1, robot.y)
    if(robotEnemy == undefined){
      robot.x -= 1;
    }
  }

  function moveUp(robot){
    var robotEnemy = ramRobot(robot, robot.x, robot.y - 1)
    if(robotEnemy == undefined){
      robot.y -= 1;
    }
  }

  function moveDown(robot){
    var robotEnemy = ramRobot(robot, robot.x, robot.y + 1)
    if(robotEnemy == undefined){
      robot.y += 1;
    }
  }

  if (!args.responses)     throw new 'response is required';
  if (!args.prevGameState) throw new 'prevGameState is required';
  if (!args.prevGameState.robots) throw new 'prevGameState.robots is required';

  // TODO
  const gameState = args.prevGameState;
  const robots    = args.prevGameState.robots;

  _.each(robots, function(robot) {
    // Check if the robot is dead!
    if (robot.health == 0) { return robot }

    var response = findRobot(robot)
    console.log("RESPONSE", response)

    // Transfer the logs over to the robot object
    robot.logs = response.logs;
    
    // look at the move and change x, y accordingly
    if(response.bearTo == 0){
      if(response.move > 0){    // UP
        moveUp(robot)
      }else if(response.move < 0 && robot.y != gameState.y){ // DOWN
        moveDown(robot)
      }
    }else if(response.bearTo == 90){
      if(response.move > 0 && robot.x != gameState.x){ // RIGHT
        moveRight(robot)
      }else if(response.move < 0){ // LEFT
        moveLeft(robot)
      }
    }else if(response.bearTo == 180){
      if(response.move > 0){    // DOWN
        moveDown(robot)
      }else if(response.move < 0){ // UP
        moveUp(robot)
      }
    }else if(response.bearTo == 270){
      if(response.move > 0){    // LEFT
        moveLeft(robot)
      }else if(response.move < 0){ // RIGHT
        moveRight(robot)
      }
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
