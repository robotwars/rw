import React       from 'react';
import ReactCanvas from 'react-canvas';
const  PT      =    React.PropTypes;
const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const surfaceWidth = window.innerWidth;
const surfaceHeight = window.innerHeight;

class Game extends React.Component {

  constructor(props) {
    super(props);
    props.socket.on('server:loop', (state) => {
      // console.log(state);
    });
  }

  getTextStyle() {
    return {
      top: 75,
      left: 80,
      width: window.innerWidth,
      height: 20,
      lineHeight: 20,
      fontSize: 12
    };
  }

  getImageStyle() {
    return {
      top: 30,
      left: 80,
      width: 40,
      height: 40
    };
  } 
  
  render() {
    const imageStyle = this.getImageStyle();
    const textStyle = this.getTextStyle();

    return (
      <div>
        Game
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
      <Image style={imageStyle} src="imgs/robot2.png" />
      <Image style={imageStyle} src="imgs/robot1.png" />
      <Text style={textStyle}>test</Text>
      </Surface>
      </div>
    );

  }

}

Game.propTypes = {
  socket: PT.object.isRequired
}

export default Game;
