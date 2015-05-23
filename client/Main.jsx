import React      from 'react';
import Game       from './Game.jsx';
import Properties from './Properties.jsx';
import Editor     from './Editor.jsx';
const  PT         =    React.PropTypes;

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      robot: {},
      code:  {}
    }
    props.socket.on('server:robot:retrieved', (robot, code) => {
      console.log('robot received', robot, code);

      code = code || {};

      this.setState({
        robot: robot,
        code:  code
      });
    });
  }

  render() {
    const robot = this.state.robot;
    const code  = this.state.code;

    return (
      <div className="container">
        <h1>RW</h1>
        <div className="col col-8">
          <Game />
        </div>
        <div className="col col-4">
          <Properties
            robot={robot}
            socket={this.props.socket} />
          <Editor
            robot={robot}
            code={code}
            socket={this.props.socket} />
        </div>
      </div>
    );
  }

}

Main.propTypes = {
  socket: PT.any.isRequired
}

export default Main;
