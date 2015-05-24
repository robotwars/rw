import React      from 'react';
import _          from 'lodash';
const PT          = React.PropTypes;

class Messsages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: {}
    }

    props.socket.on('server:message', (message) => {
      // console.log('server:message', message);
      this.setState({
        message: message
      });
    });
  }

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
    return classes[this.state.message.kind]
  }

  render() {
    const message    = this.state.message;

    if (message) {
      const kindClass  = this.getKindClass();
      const classes    = 'bold center p2 mb2 white rounded ' + kindClass;
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

Messsages.propTypes = {
  socket: PT.object.isRequired
}

export default Messsages;
