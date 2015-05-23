var createRobot  = require('./services/createRobot');
var saveRobot    = require('./services/saveRobot');
var getRobot     = require('./services/getRobot');

module.exports = function(config) {
  var io             = config.io;
  var verifyCode  = require('./services/verifyCode.js');
  var dbConfig       = config.dbConfig;

  // user connected 
  io.on('connection', function(socket) {

    var sockerId = socket.id;
    var userId = socket.request.session.id;

    // console.log('user connected, sockerId', sockerId);
    // console.log('sessionId', userId);

    // Create the robot if necessary
    createRobot(dbConfig, userId);

    // get the stored robot for the user
    // and send it
    getRobot(dbConfig, userId)
      .then(function(robot) {
        console.log(robot);
        socket.emit('server:robot:retrieved', robot);
      });

    // Handle events from the user

    // When user updated information about their robot
    socket.on('user:robot:updated', function(data) {
      // console.log(data.info, socket.id);
      saveRobot(dbConfig, userId, data.robot);
    })

    // User has updated and hit save on the code editor
    socket.on('user:code:updated', function(data) {
      console.log(data.code, socket.id);
      console.log("verify")
      var errors = verifyCode(data.code);
      // if errors empty 
        // save code
      // 
    })

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });

}
