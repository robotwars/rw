module.exports = function() {

  return `// Your code here
function(args) {

  var status = args.status;
  var walls = args.radar.walls;
  var robots = args.radar.robots;
  var logs = [];

  logs.push('Show this in my console');

  return {
    bearTo:    undefined,
    move:      0,
    aimTo:     undefined,
    useWeapon: undefined,
    logs:      logs
  };
}
`;

}
