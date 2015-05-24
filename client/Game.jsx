import React       from 'react';
import ReactCanvas from 'react-canvas';
import _           from 'lodash';
import Robot       from './Game/Robot.jsx';
import './Game.less';

const PT      =    React.PropTypes;
const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const surfaceWidth = 640;
const surfaceHeight = 640;
const blockSize = 40;

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {robots: []}

    props.socket.on('server:loop', (state) => {
      this.setState({
        robots: state.robots
      });
    });
  }

  renderRobots() {
    return _.map(this.state.robots, function(robot) {
      return <Robot blockSize={blockSize} key={robot.id} robot={robot} />;
    });
  }

  // The rendering...
  render() {
    const robots = this.state.robots;

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
  socket: PT.object.isRequired
}

export default Game;
