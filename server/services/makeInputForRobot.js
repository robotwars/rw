module.exports = function(args) {
  var gameState = args.gameState;
  var robot     = args.robot;

  if (!gameState) throw new Error('gameState is expected');
  if (!robot) throw new Error('robot is expected');

  function buildRadar() {
    return {
      0:   buildRadarForBearing(0),
      90:  buildRadarForBearing(90),
      180: buildRadarForBearing(180),
      270: buildRadarForBearing(270)
    }
  }

  function buildRadarForBearing(bearing) {
    // search coordinates
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
