var Sandbox            = require('sandbox');
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
    var sandbox = new Sandbox();

    // Run the code in a sandbox.
    sandbox.run(wrapped, function(output) {
      // console.log('Result: ' + output.result + '\n');
      if (output.result.indexOf('Error:') > -1) {
        reject(output.result);
      } else {
        resolve(output.result);
      }
    });
  });

}
