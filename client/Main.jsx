import React      from 'react';
import Game       from './Game.jsx';
import _          from 'lodash'
import Properties from './Properties.jsx';
import Status     from './Status.jsx';
import Editor     from './Editor.jsx';
import Header     from './Header.jsx';
const  PT         =    React.PropTypes;

import './Main.less';

class Main extends React.Component {

  render() {
    const socket     = this.props.socket;
    const robot      = this.props.robot;
    const code       = this.props.code;
    const gameState  = this.props.gameState;
    const robotState = this.props.robotState;

    return (
      <div className="Main container">
        <Header socket={socket} />
        <div className='clearfix'>
          <div className="col col-7">
            <Game
              robot={robot}
              gameState={gameState}
              socket={socket} />
          </div>
          <div className="col col-5">
            <Properties
              robot={robot}
              socket={socket} />
            <Status
              robot={robot}
              robotState={robotState} />
            <Editor
              robot={robot}
              robotState={robotState}
              code={code}
              socket={socket} />
          </div>
        </div>
      </div>
    );
  }

}

Main.propTypes = {
  socket:       PT.object.isRequired,
  robot:        PT.object.isRequired,
  robotState:   PT.object.isRequired,
  gameState:    PT.object.isRequired,
  code:         PT.object.isRequired
}

export default Main;
