import React      from 'react';
import Game       from './Game.jsx';
import Properties from './Properties.jsx';
import Editor     from './Editor.jsx';
const  PT         =    React.PropTypes;

import './Main.less';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      robot: {},
      code:  {}
    }
    props.socket.on('server:robot:retrieved', (robot, code) => {
      // console.log('robot received', robot, code);

      code = code || {};

      this.setState({
        robot: robot,
        code:  code
      });
    });
  }

  render() {
    const socket = this.props.socket;
    const robot = this.state.robot;
    const code  = this.state.code;

    return (
      <div className="Main container">
        <div className='clearfix'>
          <img src="/imgs/logo.png" alt="Robot Wars" />
        </div>
        <div className='clearfix'>
          <div className="col col-7">
            <Game
              socket={socket} />
          </div>
          <div className="col col-5">
            <Properties
              robot={robot}
              socket={socket} />
            <Editor
              robot={robot}
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
