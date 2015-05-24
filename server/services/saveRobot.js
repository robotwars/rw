var r = require('rethinkdbdash')();
var _ = require('lodash');

module.exports = function(args) {
  var dbConfig = args.dbConfig;
  var robot     = args.robot;

  if (!dbConfig)  throw new Error('dbConfig is required');
  if (!robot)     throw new Error('robot is required');
  if (!robot.id)  throw new Error('robot.id is required');

  var robotId  = robot.id;

  // filter params
  //robot = _.without(robot, 'logs');

  return r.db(dbConfig.db)
    .table('robots')
    .get(robotId)
    .update(robot)
    .run();
}
