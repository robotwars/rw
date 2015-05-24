module.exports = function(args) {
  // save code to database users robot table
  // should be verified first

  var dbConfig = args.dbConfig;
  var robotId = args.robotId;
  var source  = args.source;

  if (!dbConfig) throw new Error('dbConfig is required');
  if (!robotId) throw new Error('robotId is required');
  if (!source) throw new Error('source is required');

  var data = {
    robotId:   robotId,
    source:    source,
    createdAt: new Date()
  }

  // console.log('will save code', data)

  return r.db(dbConfig.db)
    .table('codes')
    .insert(data)
    .run();
}
