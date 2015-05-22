import React      from 'react';
const PT          = React.PropTypes;

class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      info: {
        name: 'Robot name'
      }
    }
  }

  onChange(event) {
    const value = event.target.value;
    const info = this.state.info;
    info.name = value;

    this.setState({
      info: info
    });

    this.save()
  }

  save() {
    const socket = this.props.socket;
    socket.emit('user:info:updated', {
      info: this.state.info
    });
  }

  render() {
    const info    = this.state.info;

    return (
      <section className='mb1'>
        <form>
          <input
            value={info.name}
            onChange={this.onChange.bind(this)}
            className='field-light'
            type="text" />
        </form>
      </section>
    );
  }

}

Editor.propTypes = {
  socket: PT.any.isRequired
}

export default Editor;
