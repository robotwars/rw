import React      from 'react';
import Codemirror from 'react-code-mirror';
import Message    from './Editor/Message.jsx';
require('codemirror/mode/javascript/javascript');

import '../node_modules/codemirror/lib/codemirror.css';
import '../node_modules/codemirror/theme/solarized.css';

const PT          = React.PropTypes;

class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      code: this.props.code,
      message: {}
    }

    props.socket.on('server:code:saved', () => {
      this.setState({
        message: ['Saved']
      });
    });

    props.socket.on('server:code:error', (message) => {
      console.log('server:code:error', message)
      this.setState({
        message: message
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      code: nextProps.code
    });
  }

  onChange(event) {
    const value = event.target.value;
    let code  = this.state.code;

    code = code || {};
    code.source = value;

    this.setState({
      code: code
    });
  }

  onSave(event) {
    const socket = this.props.socket;
    socket.emit('user:code:updated', {
      source: this.state.code.source
    });
  }

  render() {
    const code    = this.state.code;
    const source  = code.source || '// Your code here';

    return (
      <section>
        <div>
          <Codemirror
            style={{border:'1px solid black'}}
            textAreaStyle={{minHeight: '5em'}}
            value={source}
            mode='javascript'
            theme='solarized'
            lineNumbers={true}
            onChange={this.onChange.bind(this)} />
        </div>
        <div className="mt1">
          <button onClick={this.onSave.bind(this)}>Send</button>
        </div>
        <div className='mt1'>
          <Message message={this.state.message} />
        </div>
      </section>
    );
  }

}

Editor.propTypes = {
  socket: PT.any.isRequired,
  code:   PT.object.isRequired
}

export default Editor;
