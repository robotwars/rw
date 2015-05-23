import React   from 'react';
const  PT      =    React.PropTypes;

class Game extends React.Component {

  constructor(props) {
    super(props);
    props.socket.on('server:loop', (state) => {
      // console.log(state);
    });
  }

  render() {
    return (
      <div>
        GAME
      </div>
    );
  }

}

Game.propTypes = {
  socket: PT.object.isRequired
}

export default Game;
