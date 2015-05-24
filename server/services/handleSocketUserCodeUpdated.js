var verifyCode    = require('./verifyCode');
var saveRobotCode = require('./saveRobotCode');

module.exports = function(args) {
  var data = args.data;
  var robotId = args.robotId;
  var socket = args.socket;
  var dbConfig = args.dbConfig;

  if (!data) throw new Error('data is required');
  if (!robotId) throw new Error('robotId is required');
  if (!dbConfig) throw new Error('dbConfig is required');
  if (!socket) throw new Error('socket is required');
  if (!data.source) throw new Error('data.source is required');

  var verifyArgs = {
    source: data.source
  }

  verifyCode(verifyArgs)
    .then(function() {
      // If the code is good, then save it in the db
      var saveArgs = {
        dbConfig: dbConfig,
        robotId:  robotId,
        source:   data.source
      }
      console.log('Saving code');
      return saveRobotCode(saveArgs);
    })
    .then(function() {
      // Return a success message to the user
      console.log('Code is good, saving');
      var message = {
        kind:  'success',
        value: 'Saved'
      }
      socket.emit('server:message', message);
    })
    .catch(function(err) {
      // Return a error message to the user
      var message = {
        kind: 'error',
        value: err.toString()
      }
      socket.emit('server:message', message);
    });
}
