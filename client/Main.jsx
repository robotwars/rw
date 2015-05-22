import React      from 'react';
import Game       from './Game.jsx';
import Properties from './Properties.jsx';
import Editor     from './Editor.jsx';
const  PT         =    React.PropTypes;

class Main extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>RW</h1>
        <div className="col col-8">
          <Game />
        </div>
        <div className="col col-4">
          <Properties socket={this.props.socket} />
          <Editor socket={this.props.socket} />
        </div>
      </div>
    );
  }

}

Main.propTypes = {
  socket: PT.any.isRequired
}

export default Main;
