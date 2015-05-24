import React      from 'react';
import Main       from './Main.jsx';
import Loader     from './Loader.jsx';
import _          from 'lodash'
const  PT         =    React.PropTypes;

class MainLoader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      robot:      null,
      code:       null,
      gameState:  null,
      robotState: null
    }
    props.socket.on('server:robot:retrieved', (robot, code) => {
      code = code || {};

      this.setState({
        robot: robot,
        code:  code
      });
    });

    props.socket.on('server:loop', (state) => {
      // if we don't have a robot yet, then ignore
      if (!this.state.robot) return;

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

    if (!robot) return <Loader />;
    if (!code) return <Loader />;
    if (!gameState) return <Loader />;
    if (!robotState) return <Loader />;

    return (
      <Main
        socket={socket}
        robot={robot}
        code={code}
        gameState={gameState}
        robotState={robotState} />
      )
  }

}

MainLoader.propTypes = {
  socket: PT.object.isRequired
}

export default MainLoader;
