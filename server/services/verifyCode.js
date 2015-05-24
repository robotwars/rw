var runCode = require('./runCode');
var verifyCodeReturnValue = require('./verifyCodeReturnValue');
var makeGameState         = require('./makeGameState');

module.exports = function(args) {
  var source    = args.source;
  if (!source)    throw new Error('source is expected');

  var dummyRobot = {
    id: 123
  }

  return makeGameState({robots: []})
    .then(function(gameState) {
      var runArgs = {
        gameState:  gameState,
        robot:      dummyRobot,
        source:     source
      }
      return runCode(runArgs);
    })
    .then(verifyCodeReturnValue);

  
}
