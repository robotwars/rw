import React      from 'react';
const  PT         =    React.PropTypes;
import Help       from './Help.jsx';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      helpShown: false
    }
  }

  onHelp(event) {
    event.preventDefault();
    this.setState({
      helpShown: true
    });
  }

  onHelpClosed() {
    this.setState({
      helpShown: false
    });
  }

  renderHelp() {
    if (this.state.helpShown) {
      return <Help
          onClosed={this.onHelpClosed.bind(this)} />
    }
  }

  render() {
    const socket = this.props.socket;

    return (
      <header className='clearfix'>
        {this.renderHelp()}
        <div className='left'>
          <img src="/imgs/logo.png" alt="Robot Wars" />
        </div>
        <div className='right'>
          <a href="#!"
            onClick={this.onHelp.bind(this)}
            className="button py2 m0 button-transparent">Help</a>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  socket: PT.object.isRequired
}

export default Header;
