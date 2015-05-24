import React       from 'react';
import _           from 'lodash';
const PT           = React.PropTypes;

class Status extends React.Component {

  renderHealth() {
    const h = this.props.robotState.health;
    let hClass = 'bg-green';
    if (h < 30) {
      hClass = 'bg-red';
    }

    const classes = 'inline-block px1 white rounded ' + hClass;
    return (
      <div>
        Health <span className={classes}>{h}%</span>
      </div>
    )
  }

  render() {
    return (
      <section className='Status mt1'>
        {this.renderHealth()}
      </section>
    );
  }

}

Status.propTypes = {
  robotState:    PT.object.isRequired
}

export default Status;

