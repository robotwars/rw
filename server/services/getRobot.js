var r = require('rethinkdbdash')(); // Allows interacting with rethinkdb

module.exports = function(args) {
  if (!args.dbConfig) throw new Error('dbConfig is required');
  if (!args.robotId)   throw new Error('robotId is required');

  return r.db(args.dbConfig.db)
    .table('robots')
    .get(args.robotId)
    .run();
}
