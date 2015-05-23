import React       from 'react';
import ReactCanvas from 'react-canvas';
const  PT      =    React.PropTypes;

class Game extends React.Component {

  constructor(props) {
    super(props);
    props.socket.on('server:loop', (state) => {
      // console.log(state);
    });
  }

  getTextStyle() {
    return {
      top: 10,
      left: 50,
      width: window.innerWidth,
      height: 20,
      lineHeight: 20,
      fontSize: 12
    };
  }
  
  render() {
    const surfaceWidth = window.innerWidth;
    const surfaceHeight = window.innerHeight;
    const textStyle = this.getTextStyle();

    return (
      <div>
        Game
      <surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
      <text style={textStyle}>test</text>
      </surface>
      </div>
    );

  }

}

Game.propTypes = {
  socket: PT.object.isRequired
}

export default Game;
