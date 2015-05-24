chai = require('chai')
expect = chai.expect
makeInputForRobot = require('../../../server/services/makeInputForRobot')

gameState = null
robot1 = null
robot2 = null
robot3 = null
  
getResponse = (robot) ->
  args =
    gameState: gameState
    robot:     robot
  makeInputForRobot(args)

describe 'makeInputsForRobot', ->
  beforeEach ->
    robot1 =
      x: 5
      y: 5
      health: 100

    robot2 =
      x: 8
      y: 5
      health: 100

    gameState =
      robots: [robot1, robot2]

  it 'has the current health', ->
    res = getResponse(robot1)
    expect(res.status.health).to.eq(100)

  it 'has the robot2 in the radar', ->
    res = getResponse(robot1)
    expect(res.radar[90]).to.eq(robot2)
