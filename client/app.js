console.log('APP');

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
