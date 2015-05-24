import React       from 'react';
import ReactCanvas from 'react-canvas';
import _           from 'lodash';
import Robot       from './Game/Robot.jsx';
const PT      =    React.PropTypes;
const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const surfaceWidth = 600;
const surfaceHeight = 600;

class Game extends React.Component {

  constructor(props) {
    super(props);
    // var robot1 = {
    //   id: 1,
    //   name: 'Foo',
    //   x: 1,
    //   y: 4
    // }
    // var robot2 = {
    //   id: 2,
    //   name: 'Sonny',
    //   x: 10,
    //   y: 4
    // }
    this.state = {robots: []}

    props.socket.on('server:loop', (state) => {
      // console.log(state.robots[0]);
      // this.setState({robot: state.robots[0]})
      //this.setState({x: state.robots[0]['x'], y: state.robots[0]['y']})
      this.setState({
        robots: state.robots
      });

    });
  }



  renderRobots() {
    return _.map(this.state.robots, function(robot) {
      return <Robot key={robot.id} robot={robot} />;
    });
  }

  // The rendering...
  render() {
    const robots = this.state.robots;

    return (
      <div>
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
