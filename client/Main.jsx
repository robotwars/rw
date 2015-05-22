import React     from 'react';
import Game      from './Game.jsx';
import Editor    from './Editor.jsx';

class Main extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>RW</h1>
        <div className="col col-8">
          <Game />
        </div>
        <div className="col col-4">
          <Editor />
        </div>
      </div>
    );
  }

}

export default Main;
