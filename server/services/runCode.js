var VM                 = require('vm2');
var makeInputsForRobot = require('./makeInputsForRobot');
var bluebird           = require('bluebird');

module.exports = function(gameState, robot, source) {
  if (!source) throw new Error('source is expected');
  if (!gameState) throw new Error('gameState is expected');
  if (!robot) throw new Error('robot is expected');

  return new bluebird.Promise(function(resolve, reject) {
    // We need to create inputs based on the state of the game
    var inputs  = makeInputsForRobot(gameState, robot);
    inputs = JSON.stringify(inputs);
    var wrapped = '(' + source + ')(' + inputs + ')';
    console.log(wrapped.toString())
    var sb = new VM.VM({timeout: 500});

    // Run the code in a sandbox.
    var result = sb.run(wrapped);
    resolve(result);
  });

}
