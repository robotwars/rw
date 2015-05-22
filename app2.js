// var r = require('rethinkdb');

// r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
//   if(err) throw err;

//   // r.db('test1').tableCreate('robots').run(conn, function(err, res) {
//   //   if(err) throw err;
//   //   console.log(res);
    
//   //   r.table('robots').insert({ name: 'Rotty' }).run(conn, function(err, res)
//   //   {
//   //     if(err) throw err;
//   //     console.log(res);
//   //   });
//   // });


//    // r.db('test1').table('robots').insert({ name: 'Rotty' }).run(conn, function(err, res)
//    //  {
//    //    if(err) throw err;
//    //    console.log(res);
//    //  });

//   //changes

//   r.db('test1').table('robots').changes().run(conn, function(err, cursor) {
//     cursor.each(console.log);
//   });
// });

var feathers      = require('feathers');
var bodyParser    = require('body-parser');
var app           = feathers();
var robotHandlers = require('./server/handlers/robots');

app.configure(feathers.rest())
  .configure(feathers.socketio())
  .use(bodyParser.json())
  .use('/robots', robotHandlers)
  .use('/', feathers.static(__dirname + '/public'))
  .listen(3000);