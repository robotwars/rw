import React       from 'react';
import ReactCanvas from 'react-canvas';
import _           from 'lodash';
import Robot       from './Game/Robot.jsx';
import './Game.less';

const PT      =    React.PropTypes;
const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const blockSize = 36;
const surfaceWidth = blockSize * 16;
const surfaceHeight = blockSize * 16;

class Game extends React.Component {

  renderRobots() {
    // console.log('renderRobots')
    const robots = this.props.gameState.robots;
    return _.map(robots, function(robot) {
      // console.log(robot)
      return <Robot
        blockSize={blockSize}
        key={robot.id} 
        robot={robot} />;
    });
  }

  // The rendering...
  render() {
    return (
      <div className='Game'>
        <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
          {this.renderRobots()}
        </Surface>
      </div>
    );
  }
}

Game.propTypes = {
  socket:    PT.object.isRequired,
  gameState: PT.object.isRequired
}

export default Game;
