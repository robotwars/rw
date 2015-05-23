var r = require('rethinkdbdash')();

module.exports = function(dbConfig, userId) {
  // attempt to create a robot for this user
  // in the DB if not there

  var robot = {
    id: userId,
    name: 'Robot name'
  }

  r.db(dbConfig.db)
    .table('robots')
    .insert(robot)
    .run();
}
