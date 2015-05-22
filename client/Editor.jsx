import React   from 'react'; // var React = require('react');
import Codemirror from 'react-codemirror';

class Editor extends React.Component {

  constructor(props){
    super(props);
    this.state = {code: 'foo'}
  }
  updateCode(newCode){
    this.setState({
      code: newCode
    })  
  }
  
  render() {
    const options = { 
      lineNumbers: true
    };

    return (
      <div>
        <Codemirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
    );
  }

}

export default Editor;
