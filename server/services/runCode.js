var VM                 = require('vm2');
var makeInputForRobot  = require('./makeInputForRobot');
var bluebird           = require('bluebird');

module.exports = function(args) {
  var source    = args.source;
  var gameState = args.gameState;
  var robot     = args.robot;

  if (!source)    throw new Error('source is expected');
  if (!gameState) throw new Error('gameState is expected');
  if (!robot)     throw new Error('robot is expected');

  return new bluebird.Promise(function(resolve, reject) {
    // We need to create inputs based on the state of the game
    var inputs  = makeInputForRobot(args);
    inputs = JSON.stringify(inputs);

    var wrapped = '(' + source + ')(' + inputs + ')';
    var sb = new VM.VM({timeout: 500});

    // Run the code in a sandbox.
    var result;
    try {
      // console.log(wrapped);
      result = sb.run(wrapped);
    } catch(e) {
      return reject(e);
    }

    return resolve(result);
  });

}
