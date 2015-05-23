import React       from 'react';
import ReactCanvas from 'react-canvas';

class Game extends React.Component {

  render() {
    const surfaceWidth = window.innerWidth;
    const surfaceHeight = window.innerHeight;
    const textStyle = this.getTextStyle();

    return (
      <div>
        Game
      <surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
      <text style={textStyle}></text>
      </surface>
      </div>
    );
  }

}

export default Game;
