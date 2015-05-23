import React       from 'react';
import ReactCanvas from 'react-canvas';
const PT      =    React.PropTypes;
const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const surfaceWidth = 600;
const surfaceHeight = 600;

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {game: [{name: "Sonny", x: 50, y: 80}, {name: "Terminator", x: 90, y: 200}]}

    props.socket.on('server:loop', (state) => {
      console.log(state.robots[0]);
      this.setState({robot: state.robots[0]})
    });
  }

  // Get the robot name
  getRobotName(robot){
    if (robot != undefined){
      return robot['name']
    }
  }

  // Position the robot name under the robot
  getTextStyle(robot) {
    if (robot != undefined){
      return {
        top: robot['y'] + 45,
        left: robot['x'],
        width: window.innerWidth,
        height: 20,
        lineHeight: 20,
        fontSize: 12
      };
    }
  }

  // Position the robot
  getImageStyle(robot) {
    if (robot != undefined){
      console.log("test:", robot);
      return {
        top: robot['y'],
        left: robot['x'],
        width: 40,
        height: 40
      };
    }
  } 
  
  // The rendering...
  render() {
    const imageStyle = this.getImageStyle();
    const textStyle = this.getTextStyle();
    const game = this.state.game;

    return (
      <div>
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
      <Image style={this.getImageStyle(game[0])} src="imgs/robot1.png" />
      <Text style={this.getTextStyle(game[0])}>{this.getRobotName(game[0])}</Text>
      </Surface>
      </div>
    );

  }

}

Game.propTypes = {
  socket: PT.object.isRequired
}

export default Game;
