var _        = require('lodash');
var runCode  = require('./runCode');
var bluebird = require('bluebird'); // Promise framework
var Joi      = require('joi');      // For evaluations, simplier than chai

/*
Example expected result
{
  bearTo: 90,
  move: 1,
  aimTo: 90,
  useWeapon: 'saw',
  logs: []
}
*/

// validate the input from the user
var schema = Joi.object().keys({
  bearTo:        Joi.any().valid(undefined, 0, 90, 180, 270),
  move:          Joi.any().valid(undefined, -1, 0, 1),
  aimTo:         Joi.any().valid(undefined, 0, 90, 180, 270),
  useWeapon:     Joi.any().valid('flame', 'flipper', 'saw', 'laser'),
  logs:          Joi.array()
});

module.exports = function(result) {

  console.log('verifyCodeReturnValue', result);

  return new bluebird.Promise(function(resolve, reject) {

    return Joi.validate(result, schema, function(err, value) {
      if (err) {
        reject(err);
      }else {
        resolve();
      }
    });

  });
}
