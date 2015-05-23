var r = require('rethinkdbdash')(); // Allows interacting with rethinkdb

module.exports = function(dbConfig, userId) {
  return r.db(dbConfig.db)
    .table('robots')
    .get(userId)
    .run();
}
