var bluebird  = require('bluebird');
var saveRobot = require('./saveRobot');

module.exports = function(args) {
  var dbConfig = args.dbConfig;
  var robots = args.robots;

  if (!dbConfig) throw new Error('dbConfig is required');
  if (!robots)   throw new Error('robots is required');

  return bluebird.Promise.map(robots, function(robot) {

    var saveArgs = {
      dbConfig: dbConfig,
      robot:    robot
    }

    return saveRobot(saveArgs);
  });
}
