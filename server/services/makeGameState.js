var bluebird             = require('bluebird');

module.exports = function(args) {
  var robots = args.robots;

  if (!robots) throw new Error('robots is required');

  return new bluebird.Promise(function(resolve, reject) {
    var state = {
      maxX:   600,
      maxY:   600,
      robots: robots
    };
    resolve(state);
  });

}
