var r = require('rethinkdb');
var connection = null;

function createDb(connectionCB) {
	connection.use('rw');
	try {
		r.dbCreate('rw').run(connection, function () {
			console.log('DB created');
			return createRobotsTable(connectionCB);
		});
	} catch (ex) {
		return createRobotsTable(connectionCB);
	}
}

function createRobotsTable(connectionCB) {
	try {
		r.tableCreate('robots').run(connection, function () {
			console.log('Table robots created');
			return connectionCB(null, connection);
		});
	} catch (ex) {
		return connectionCB(null, connectionCB);
	}
}

module.exports = function (connectionCB) {
	// console.log('getConnection');
	// console.log('connection', connection);

	if (connection) { 
		connectionCB(null, connection);
	} else {
		r.connect( {host: 'localhost', port: 28015}, function(err, conn) {

			if (err) return connectionCB(err)

			// store the connection for later
			connection = conn;

			return createDb(connectionCB);
		});
	}
}