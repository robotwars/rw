var runCode = require('./runCode');
var verifyCodeReturnValue = require('./verifyCodeReturnValue');

module.exports = function(args) {
  var source    = args.source;
  if (!source)    throw new Error('source is expected');

  var runArgs = {
    gameState:  {},
    robot:      {},
    source:     source
  }

  return runCode(runArgs)
    .then(verifyCodeReturnValue);
}
