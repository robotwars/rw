module.exports = function() {

  return `// Your code here
function(args) {

  // inputs
  var status  = args.status;
  var walls   = args.radar.walls;
  var robots  = args.radar.robots;

  // outputs
  var bearTo  = 0; // 0, 90, 180, 270
  var move    = 0; // -1, 0, 1
  var logs    = [];

  logs.push('Show this in my dev console');

  return {
    bearTo:    bearTo,
    move:      move,
    logs:      logs
  };
}
`;

}
