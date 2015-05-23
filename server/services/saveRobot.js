var r = require('rethinkdbdash')();

module.exports = function(dbConfig, userId, data) {
  return r.db(dbConfig.db)
    .table('robots')
    .get(userId)
    .update(data)
    .run();
}
