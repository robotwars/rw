module.exports = function(io) {

  // user connected
  io.on('connection', function(socket) {
    console.log('connection')
    // create a robot for this user
    socket.emit('news', { hello: 'world' });

    socket.on('code:update', function(data) {
      console.log(data.code, socket.id);
    })

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });

}
