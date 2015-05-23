var gameloop = require('node-gameloop');
var timesPerSec = 5;

module.exports = function(config) {
  var io = config.io;

  // game loop
  // start the loop at 5 fps (1000/30ms per frame) and grab its id
  var frameCount = 0;
  var id = gameloop.setGameLoop(function(delta) {
    // `delta` is the delta time from the last frame
    frameCount++;
    // console.log('Hi there! (frame=%s, delta=%s)', frameCount++, delta);
    io.sockets.emit('server:loop', {state: frameCount})
  }, 1000 / timesPerSec);
}
