// /** @jsx React.DOM */

// var React   = require('react');
// var signals = require('signals');
// var imm     = require('imm');


// var robotStore = (function () {
// 	var robots    = imm([]);
// 	var onChanged = new signals.Signal();

// 	function all() {
// 		return robots.array();
// 	}

// 	function add(item) {
// 		robots = robots.add(item);
// 		onChanged.dispatch();
// 	}

// 	function replace(items) {
// 		robots = robots.replace(items);
// 		onChanged.dispatch();
// 	}

// 	return {
// 		all: all,
// 		add: add,
// 		replace: replace,
// 		onChanged: onChanged
// 	}
// }());


// var Robot = React.createClass({
// 	propTypes: {
// 		robot: React.PropTypes.object.isRequired,
// 	},
// 	render: function() {
// 		return (
// 			<div>
// 				<span>Robot</span>
// 				{this.props.robot.id}
// 				{this.props.robot.label}
// 			</div>
// 		);
// 	}
// });

// var RobotList = React.createClass({
// 	propTypes: {
// 		robots: React.PropTypes.array.isRequired,
// 	},
// 	render: function() {
// 		var robots = this.props.robots.map(function (robot) {
// 			return <Robot key={robot.id} robot={robot} />
// 		});
// 		return (
// 			<div>
// 				<span>RobotList</span>
// 				{robots}
// 			</div>
// 		);
// 	}
// });

// var App = React.createClass({
// 	getInitialState: function () {
// 		return {
// 			robots: []
// 		}
// 	},
// 	componentDidMount: function () {
// 		robotStore.onChanged.add(this.onChanged);
// 	},
// 	componentWillUnmount: function () {
// 		robotStore.onChanged.remove(this.onChanged);
// 	},
// 	onChanged: function () {
// 		console.log('onChanged');
// 		this.setState({
// 			robots: robotStore.all()
// 		});
// 	},
//   render: function() {
// 		return (
// 			<div>
// 				<RobotList robots={this.state.robots} />
// 			</div>
// 		);
// 	}
// });
// React.render(
// 	<App />,
// 	document.getElementById('app')
// );

// Connect to SocketIO on the same host
var socket = io.connect();

socket.on('refresh', function(state) {
	console.log('state received', state);
	// robotStore.add(robot);
});

// socket.on('robots updated', function(robot) {
//   console.log('Someone updated a Robot', robot);
// });

// socket.on('robots patched', function(robot) {
//   console.log('Someone patched', robot);
// });

// socket.emit('robots::create', {
//   label: 'AA'
// }, {}, function(error, robot) {
//   socket.emit('robots::find', {}, function(error, robots) {
//     console.log('Robots from server', robots);
//     if (robots) robotStore.replace(robots);
//   });
// });