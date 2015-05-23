var r = require('rethinkdbdash')(); // Allows interacting with rethinkdb

module.exports = function(args) {
  var dbConfig = args.dbConfig;

  if (!dbConfig) throw new Error('dbConfig is required');

  return r.db(dbConfig.db)
    .table('robots')
    .filter({active: true})
    .run();
}
