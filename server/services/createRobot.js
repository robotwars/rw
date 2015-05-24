var r = require('rethinkdbdash')();

module.exports = function(args) {
  if (!args.dbConfig) throw new Error('dbConfig is required');
  if (!args.robotId)   throw new Error('robotId is required');

  // attempt to create a robot for this user
  // in the DB if not there

  var robot = {
    id:     args.robotId,
    name:   'Robot',
    active: true,
    x: 7,
    y: 7,
    health: 100
  }

  r.db(args.dbConfig.db)
    .table('robots')
    .insert(robot)
    .run();
}
