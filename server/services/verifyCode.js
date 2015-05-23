var runCode = require('./runCode');
var verifyCodeReturnValue = require('./verifyCodeReturnValue');

module.exports = function(source) {

  console.log('verifyCode')

  var gameState = {}
  var robot = {}

  return runCode(gameState, robot, source)
    .then(verifyCodeReturnValue);
}
