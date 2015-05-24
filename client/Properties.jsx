import React      from 'react';
// import _          from 'lodash';
const PT          = React.PropTypes;

class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      robot: props.robot
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps)
    this.setState({
      robot: nextProps.robot
    });
  }

  onChange(event) {
    const value = event.target.value;
    const robot = this.state.robot;
    robot.name = value;

    this.setState({
      robot: robot
    });

    this.save()
  }

  save() {
    const socket = this.props.socket;
    const robot = this.state.robot;

    // we don't want to send a change to the code
    // robot = _.without(robot);

    socket.emit('user:robot:updated', {
      robot: robot
    });
  }

  render() {
    const robot    = this.state.robot;

    return (
      <section className='mb1'>
        <form className='clearfix'>
          <div className='col col-4'>
            <label htmlFor="">Name: </label>
          </div>
          <div className='col col-8'>
            <input
              value={robot.name}
              onChange={this.onChange.bind(this)}
              className='field-light full-width'
              type="text" />
          </div>
        </form>
      </section>
    );
  }

}

Editor.propTypes = {
  socket: PT.any.isRequired,
  robot:  PT.object.isRequired
}

export default Editor;
