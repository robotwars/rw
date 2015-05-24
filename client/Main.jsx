import React      from 'react';
import Game       from './Game.jsx';
import _          from 'lodash'
import Properties from './Properties.jsx';
import Editor     from './Editor.jsx';
import Header     from './Header.jsx';
const  PT         =    React.PropTypes;

import './Main.less';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      robot: {},
      code:  {},
      gameState: {},
      robotState: {}
    }
    props.socket.on('server:robot:retrieved', (robot, code) => {
      code = code || {};

      this.setState({
        robot: robot,
        code:  code
      });
    });

    props.socket.on('server:loop', (state) => {
      // get our robot
      const robots = state.robots;
      const robotState = _.find(robots, (robot) => {
        return robot.id === this.state.robot.id;
      });
      // console.log(robotState)
      this.setState({
        gameState: state,
        robotState: robotState
      });
    });
  }

  render() {
    const socket     = this.props.socket;
    const robot      = this.state.robot;
    const code       = this.state.code;
    const gameState  = this.state.gameState;
    const robotState = this.state.robotState;

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
  socket: PT.object.isRequired
}

export default Main;
