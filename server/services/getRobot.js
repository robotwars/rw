var r = require('rethinkdbdash')();

module.exports = function(dbConfig, userId) {
  return r.db(dbConfig.db)
    .table('robots')
    .get(userId)
    .run();
}
