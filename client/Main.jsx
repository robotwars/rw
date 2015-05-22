import React     from 'react';
import Game      from './Game.jsx';
import Editor    from './Editor.jsx';

class Main extends React.Component {

  render() {
    return (
      <div>
        <div className="col col-6">
          <Game />
        </div>
        <div className="col col-6">
          <Editor />
        </div>
      </div>
    );
  }

}

export default Main;
