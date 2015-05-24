var saveRobot     = require('./saveRobot');

module.exports = function(args) {

  var robotId = args.robotId;
  var socket = args.socket;
  var dbConfig = args.dbConfig;

  if (!robotId)  throw new Error('robotId is required');
  if (!dbConfig) throw new Error('dbConfig is required');
  if (!socket)   throw new Error('socket is required');

  console.log('handleSocketDisconnected', robotId);

  var robot = {
    id:     robotId,
    active: false
  }

  var args = {
    dbConfig: dbConfig,
    robot:    robot
  }

  var promise = saveRobot(args)
    .then(function(val) {
      // console.log(val);
    })
    .catch(function(err) {
      // console.log('err', err);
    });

  return promise;
}
