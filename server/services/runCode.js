var Sandbox = require('sandbox');

module.exports = function(source, gameState, cb) {

  var inputs = JSON.stringify('Sam');
  var wrapped = '(' + source + ')(' + inputs + ')';

  var sandbox = new Sandbox();

  sandbox.run(wrapped, function(output) {
    console.log('Result: ' + output.result + '\n');
  });
}
