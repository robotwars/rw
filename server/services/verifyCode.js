var chai = require('chai');
var expect  = chai.expect;

module.exports = function(code) {

  // try and chai plugin
  console.log('within verifyCode')
  console.log(code);

  // Get result from a sandboxed environment
  var result = {
    bearTo: 90,
    move: 1,
    aimTo: 90,
    useWeapon: 'saw'
  }

  try {
    // Check bearTo
    expect([undefined, 0, 90, 180, 270]).to.include(result.bearTo);

    // Check move
    expect([undefined, -1, 0, 1]).to.include(result.move);

    // Check aimTo
    expect([undefined, 0, 90, 180, 270]).to.include(result.aimTo);

    // Check weapons
    expect([undefined, 'flame thrower', 'flipper', 'saw', 'laser']).to.include(result.useWeapon);

    // Good user lets continue
    console.log('Good user');
    console.log(code);
  } catch (e) {
    console.log('Bad user!');
    console.log(e);
  }

  //console.log(code['bearTo']);
  // return something good, bad
}
