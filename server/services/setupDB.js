var r = require('rethinkdbdash')();

function createDb(dbConfig) {
  console.log('createDb');

  return r.dbCreate(dbConfig.db)
    .run();
}

function createTable(dbConfig, tableName) {
  console.log('createTable', tableName);
  return r.db(dbConfig.db)
    .tableCreate(tableName)
    .run()
    .error(function(e) {
      // console.error('error', e);
    });
}

function setupDB(dbConfig) {
  return createDb(dbConfig)
    .then(createTable(dbConfig, 'robots'))
    .then(createTable(dbConfig, 'sessions'))
    .error(function(e) {
      // console.error('error', e);
    });
}

module.exports = setupDB;
