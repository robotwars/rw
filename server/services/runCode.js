var Sandbox  = require('sandbox');
var bluebird = require('bluebird');

module.exports = function(source, gameState, cb) {

  return new Promise(function(resolve, reject) {
    var inputs = JSON.stringify('Sam');
    var wrapped = '(' + source + ')(' + inputs + ')';
    var sandbox = new Sandbox();

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
