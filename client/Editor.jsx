import React      from 'react';
import Codemirror from 'react-code-mirror';
const PT          = React.PropTypes;

require('codemirror/mode/javascript/javascript');

import '../node_modules/codemirror/lib/codemirror.css';
import '../node_modules/codemirror/theme/solarized.css';

class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      code: '// foo'
    }
  }

  onChange(event) {
    const code = event.target.value;
    // console.log(code)
    this.setState({
      code: code
    });
  }

  render() {
    const code    = this.state.code;

    return (
      <section>
        <div>
          <Codemirror
            style={{border:'1px solid black'}}
            textAreaStyle={{minHeight: '5em'}}
            defaultValue={code}
            mode='javascript'
            theme='solarized'
            lineNumbers={true}
            onChange={this.onChange.bind(this)} />
        </div>
        <div className="mt1">
          <button>Save</button>
        </div>
      </section>
    );
  }

}

Editor.propTypes = {
  socket: PT.any.isRequired
}

export default Editor;
