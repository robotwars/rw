var bluebird             = require('bluebird');

module.exports = function(args) {
  var robots = args.robots;

  if (!robots) throw new Error('robots is required');

  return new bluebird.Promise(function(resolve, reject) {
    var state = {
      x:      15,
      y:      15,
      robots: robots
    };
    resolve(state);
  });

}
