import React       from 'react';
import _           from 'lodash';
const PT           = React.PropTypes;

class Log extends React.Component {

  renderLogs() {
    const logs = this.props.robotState.logs;
    return _.map(logs, (log) => {
      console.log(log)
    })
  }

  render() {
    return (
      <section>
        <div>
          {this.renderLogs()}
        </div>
      </section>
    );
  }

}

Log.propTypes = {
  socket:        PT.object.isRequired,
  robotState:    PT.object.isRequired
}

export default Log;

