module.exports = function(dbConfig, userId, code) {
  // save code to database users robot table
  // should be verified first
  console.log('saveRobotCode', userId, code);

  var data = {
    robotId: userId,
    code: code
  }

  return r.db(dbConfig.db)
    .table('codes')
    .insert(data)
    .run();
}
