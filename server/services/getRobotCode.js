var r = require('rethinkdbdash')();

// get the latest code snippet for the given robot
// we save all valid snippets
module.exports = function(args) {
  var robotId = args.robotId;
  var dbConfig = args.dbConfig;

  if (!dbConfig) throw new Error('dbConfig is required');
  if (!robotId)   throw new Error('robotId is required');

  return r.db(dbConfig.db)
    .table('codes')
    .filter({robotId: robotId})
    .orderBy('createdAt')
    .run()
    .then(function(results) {
      // console.log(results)
      return results.pop();
    });
}
