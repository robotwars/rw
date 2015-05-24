import React       from 'react';
import ReactCanvas from 'react-canvas';
const PT      =    React.PropTypes;
const Surface = ReactCanvas.Surface;
const Group = ReactCanvas.Group;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;

class Robot extends React.Component {

  getRobotTop() {
    return this.props.robot.y * this.props.blockSize
  }

  getRobotLeft() {
    return this.props.  robot.x * this.props.blockSize;
  }

  // Position the robot name under the robot
  getTextStyle() {
    const robot = this.props.robot;

    return {
      top:    this.getRobotTop(),
      left:   this.getRobotLeft(),
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
      top:    this.getRobotTop(),
      left:   this.getRobotLeft(),
      width:  this.props.blockSize,
      height: this.props.blockSize
    };

  }

  // Position the robot
  getHealthImageStyle() {
    const robot = this.props.robot;
    let imgW = 1;

    if (robot.health > 1) {
      imgW = this.props.blockSize * robot.health / 100;
    }

    return {
      top:    this.getRobotTop(),
      left:   this.getRobotLeft(),
      width:  imgW,
      height: this.props.blockSize
    };

  } 

  getHealthImage() {
    const robot = this.props.robot;

    if (robot.health > 30) {
      return '/imgs/health-green.png';
    } else {
      return '/imgs/health-red.png';
    }
  }

  // The rendering...
  render() {
    const robot            = this.props.robot;
    const imageStyle       = this.getImageStyle();
    const healthImageStyle = this.getHealthImageStyle();
    const textStyle        = this.getTextStyle();
    const name             = robot.name;
    const healthImg        = this.getHealthImage();

    // console.log(robot)

    return (
      <Group>
        <Image style={imageStyle} src="imgs/robot1.png" />
        <Image style={healthImageStyle} src={healthImg} />
        <Text style={textStyle}>{name}</Text>
      </Group>
    );

  }

}

Robot.propTypes = {
  robot:     PT.object.isRequired,
  blockSize: PT.number.isRequired
}

export default Robot;
