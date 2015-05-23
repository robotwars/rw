var r = require('rethinkdbdash')();

// get the latest code snippet for the given robot
// we save all valid snippets
module.exports = function(dbConfig, userId) {
  return r.db(dbConfig.db)
    .table('robots')
    .get(userId)
    .run();
}
