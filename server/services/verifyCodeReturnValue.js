var _        = require('lodash');
var runCode  = require('./runCode');
var bluebird = require('bluebird');
var Joi      = require('joi');

// var valid

// Example expected result
// {
//   bearTo: 90,
//   move: 1,
//   aimTo: 90,
//   useWeapon: 'saw'
// }

var schema = Joi.object().keys({
  bearTo:        Joi.any().valid(undefined, 0, 90, 180, 270),
  move:          Joi.any().valid(undefined, -1, 0, 1),
  aimTo:         Joi.any().valid(undefined, 0, 90, 180, 270),
  useWeapon:     Joi.any().valid('flame', 'flipper', 'saw', 'laser')
});

module.exports = function(result) {

  // try and chai plugin
  console.log('verifyCodeReturnValue', result);
  console.log(_.isString(result))

  return new bluebird.Promise(function(resolve, reject) {

    return Joi.validate(result, schema, function(err, value) {
      // console.log(err)
      // console.log(value)
      if (err) {
        reject(err);
      }else {
        resolve();
      }
    });

  });
}
