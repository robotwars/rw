import React       from 'react';
import ReactCanvas from 'react-canvas';
const PT      =    React.PropTypes;
const Surface = ReactCanvas.Surface;
const Group = ReactCanvas.Group;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const surfaceWidth = 600;
const surfaceHeight = 600;

class Robot extends React.Component {

  // Position the robot name under the robot
  getTextStyle() {
    const robot = this.props.robot;

    return {
      top:   robot.y * 40,
      left:   robot.x * 40,
      width: window.innerWidth,
      height: 20,
      lineHeight: 20,
      fontSize: 10
    };
  }

  // Position the robot
  getImageStyle() {
    const robot = this.props.robot;

    return {
      top:   robot.y * 40,
      left:   robot.x * 40,
      width: 40,
      height: 40
    };

  } 
  
  // The rendering...
  render() {
    const imageStyle = this.getImageStyle();
    const textStyle = this.getTextStyle();
    const robot = this.props.robot;
    const name = robot.name;

    // const styles = {
    //   top:  robot.y * 40,
    //   left: robot.x * 40,
    // }


    return (
      <Group>
        <Image style={imageStyle} src="imgs/robot1.png" />
        <Text style={textStyle}>{name}</Text>
      </Group>
    );

  }

}

Robot.propTypes = {
  robot: PT.object.isRequired
}

export default Robot;
