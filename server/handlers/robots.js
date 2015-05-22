var r  = require('rethinkdb');
var getConnection = require('../db');

// Return all Robots
function find(params, callback) {
	console.log('robots: find');
	
	getConnection(function (err, connection) {
		r.table('robots').run(connection, function (err, cursor) {

			if (err) return callback(err);

			cursor.toArray(function(err, items) {
				if (err) return callback(err)
					// throw err;
				callback(null, items); 
			});
      
    });
	});
}

function get(id, params, callback) {
  // try {
  //   callback(null, this.getTodo(id));
  // } catch(error) {
  //   callback(error);
  // }
}

function create(data, params, callback) {
	console.log('robots: create');
	getConnection(function (err, connection) {
		r.table('robots').insert(data).run(connection, function (err, result) {
      if (err) return callback(err); //throw err;
      console.log(JSON.stringify(result, null, 2));
      callback(null, result); 
    });
  });
}

function update(id, data, params, callback) {
  // try {
  //   var todo = this.getTodo(id);
  //   var index = this.todos.indexOf(todo);

  //   data.id = todo.id;
  //   // Replace all the data
  //   this.todos[index] = data;
  //   callback(null, data);
  // } catch(error) {
  //   callback(error);
  // }
}

function patch(id, data, params, callback) {
  // try {
  //   var todo = this.getTodo(id);

  //   // Extend the existing Todo with the new data
  //   Object.keys(data).forEach(function(key) {
  //     if(key !== 'id') {
  //       todo[key] = data[key];
  //     }
  //   });

  //   callback(null, todo);
  // } catch(error) {
  //   callback(error);
  // }
}

function remove(id, params, callback) {
  // try {
  //   var todo = this.getTodo(id);
  //   var index = this.todos.indexOf(todo);

  //   // Splice it out of our Todo list
  //   this.todos.splice(index, 1);
  //   callback(null, todo);
  // } catch(error) {
  //   callback(error);
  // }
}

module.exports = {
  find:    find,
  get:     get,
  create:  create,
  update:  update,
  patch:   patch,
  remove:  remove
}