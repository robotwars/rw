module.exports = function(args) {
  var gameState = args.gameState;
  var robot     = args.robot;

  if (!gameState) throw new Error('gameState is expected');
  if (!robot) throw new Error('robot is expected');

  // TODO calc the inputs for the robot
  return {
    radar: {

    },
    status: {
      shield: 100,
      health: 100 
    }
  }
}
