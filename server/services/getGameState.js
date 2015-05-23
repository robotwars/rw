var getAllActiveRobots    = require('../services/getAllActiveRobots');
var makeGameState         = require('../services/makeGameState');

/*
- Fetches all active robots
- Returns the current game step with the active robots
*/

module.exports = function(args) {

  return getAllActiveRobots(args)
    .then(function(robots) {
      return makeGameState({robots: robots});
    })

}
