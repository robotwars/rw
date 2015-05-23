import React      from 'react';
import _          from 'lodash';
const PT          = React.PropTypes;

class Editor extends React.Component {

  componentWillReceiveProps(nextProps) {
    // animation
  }

  // renderMessages() {
  //   return _.map(this.props.message, function(message) {
  //     return (<span>{message}</span>);
  //   });
  // }

  getKindClass() {
    const classes = {
      error:   'bg-red',
      success: 'bg-green'
    }
    return classes[this.props.message.kind]
  }

  render() {
    const kindClass  = this.getKindClass();
    const message    = this.props.message;
    const classes = 'bold center p2 mb2 white rounded ' + kindClass;

    if (message) {
      return (
        <div className={classes}>
          {message.value}
        </div>
      );
    } else {
      return <span></span>
    }
  }

}

Editor.propTypes = {
  message: PT.object
}

export default Editor;
