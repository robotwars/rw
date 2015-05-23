var chai     = require('chai');
var expect   = chai.expect;
var runCode  = require('./runCode');
var bluebird = require('bluebird');

module.exports = function(result) {

  // try and chai plugin
  console.log('verifyCodeReturnValue')
  console.log(result);

  // Get result from a sandboxed environment
  // var result = {
  //   bearTo: 90,
  //   move: 1,
  //   aimTo: 90,
  //   useWeapon: 'saw'
  // }
  return new Promise(function(resolve, reject) {
    try {
      expect(result).to.be.typeOf('object');

      // Check bearTo
      expect([undefined, 0, 90, 180, 270]).to.include(result.bearTo);

      // Check move
      expect([undefined, -1, 0, 1]).to.include(result.move);

      // Check aimTo
      expect([undefined, 0, 90, 180, 270]).to.include(result.aimTo);

      // Check weapons
      expect([undefined, 'flame thrower', 'flipper', 'saw', 'laser']).to.include(result.useWeapon);

      // Good user lets continue
      resolve('Good');
    } catch (e) {
      console.log('Bad user!');
      console.log(e);
      reject(e);
    }
  });
}
