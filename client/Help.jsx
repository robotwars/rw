import React      from 'react';
const  PT         =    React.PropTypes;

class Help extends React.Component {

  onClose(event) {
    event.preventDefault();
    this.props.onClosed();
  }

  renderContent() {
    return (
      <div>
        <h3>Arguments</h3>
        <pre>
        <code>
        {`
          {
            radar: {
              robots: [],
              walls: {
                0: 1,
                90: 14,
                180: 1,
                270: 14
              }
            },
            status: {
              health: 100
            }
          }
        `}
        </code>
        </pre>
      </div>
    )
  }

  render() {

    return (
      <div className='clearfix bg-yellow'>
        <div className='clearfix'>
          <div className='left px2'>
            <h2>Help</h2>
          </div>
          <div className='right'>
            <a href="#!"
              onClick={this.onClose.bind(this)}
              className="button py2 m0 button-transparent">X</a>
          </div>
        </div>
        <div className='clearfix px2'>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

Help.propTypes = {
  onClosed: PT.func.isRequired
}

export default Help;
