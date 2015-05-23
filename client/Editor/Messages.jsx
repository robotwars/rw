import React      from 'react';
import _          from 'lodash';
const PT          = React.PropTypes;

class Editor extends React.Component {

  componentWillReceiveProps(nextProps) {

  }

  renderMessages() {
    return _.map(this.props.messages, function(message) {
      return (<span>{message}</span>);
    });
  }

  render() {
    const messages    = this.props.messages;

    return (
      <section className='mb1'>
       {this.renderMessages()}
      </section>
    );
  }

}

Editor.propTypes = {
  messages: PT.array.isRequired
}

export default Editor;
