var runCode = require('./runCode');
var verifyCodeReturnValue = require('./verifyCodeReturnValue');

module.exports = function(source) {

  console.log('verifyCode')

  var runArgs = {
    gameState:  {},
    robot:      {},
    source:     source
  }

  return runCode(runArgs)
    .then(verifyCodeReturnValue);
}
