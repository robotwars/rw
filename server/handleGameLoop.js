var gameloop    = require('node-gameloop');
var runLoop     = require('./services/runLoop');
var timesPerSec = 2;
var busy        = false;

module.exports = function(config) {
  var io = config.io;

  // game loop
  // start the loop at 5 fps (1000/30ms per frame) and grab its id
  var frameCount = 0;

  var id = gameloop.setGameLoop(function(delta) {
    if (busy) return;
    busy = true;
    var args = {
      dbConfig:  config.dbConfig
    }

    runLoop(args)
      .then(function(gameState) {
        // console.log(gameState)
        busy = false;
        io.sockets.emit('server:loop', gameState);
      })

  }, 1000 / timesPerSec);
}

