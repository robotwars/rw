var runCode = require('./runCode');
var verifyCodeReturnValue = require('./verifyCodeReturnValue');

module.exports = function(code) {

  console.log('verifyCode')

  return runCode(code)
    .then(verifyCodeReturnValue);
}
