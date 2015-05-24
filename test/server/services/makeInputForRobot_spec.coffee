chai = require('chai')
expect = chai.expect
makeInputForRobot = require('../../../server/services/makeInputForRobot')

gameState = null
robot1 = null
robot2 = null
  
getResponse = (robot) ->
  args =
    gameState: gameState
    robot:     robot
  makeInputForRobot(args)

describe 'makeInputsForRobot', ->
  beforeEach ->
    robot1 =
      id: 1
      x: 5
      y: 5
      health: 100

    robot2 =
      id: 2
      x: 8
      y: 2
      health: 100

    gameState =
      x:      15
      y:      15
      robots: [robot1, robot2]

  describe 'status', ->
    it 'has the current health', ->
      res = getResponse(robot1)
      expect(res.status.health).to.eq(100)

  describe 'radar', ->
    it 'has the robot2 in the radar', ->
      res = getResponse(robot1)
      expect(res.radar.robots.length).to.eq(1)

    it 'has relative position x', ->
      res = getResponse(robot1)
      other = res.radar.robots[0]
      expect(other.x).to.eq(3)

    it 'has relative position y', ->
      res = getResponse(robot1)
      other = res.radar.robots[0]
      expect(other.y).to.eq(-3)

    it 'doesnt have a robot out of range', ->
      robot2.x = 9
      res = getResponse(robot1)
      expect(res.radar.robots.length).to.eq(0)

    describe '.walls', ->
      it '0', ->
        robot1.y = 0
        res = getResponse(robot1)
        expect(res.radar.walls[0]).to.eq(0)

      it '90', ->
        res = getResponse(robot1)
        expect(res.radar.walls[90]).to.eq(10)


