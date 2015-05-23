var bluebird             = require('bluebird');

module.exports = function(args) {
  var robots = args.robots;

  if (!robots) throw new Error('robots is required');

  return new bluebird.Promise(function(resolve, reject) {
    var state = {
      robots: robots
    };
    resolve(state);
  });

}
