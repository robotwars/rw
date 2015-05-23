var Express        = require('express');

// Cookie parser middleware
var CookieParser             = require('cookie-parser');
var cookieParserMiddleware   = CookieParser();

// Session middleware for Express
// https://github.com/expressjs/session
var ExpressSession = require('express-session');
var RDBStore       = require('express-session-rethinkdb')(ExpressSession);

// Our dependecies
var handleSockets  = require('./server/handleSockets.js');
var handleGameLoop = require('./server/handleGameLoop.js');
var setupDB        = require('./server/services/setupDB');

// Key used for hashing sessions
var sessionsSecretKey = 'my5uperSEC537(key)!';

// Configuration for RethinkDB
var dbConfig = {
  db:     'rw',
  host:   'localhost',
  port:   28015
};

// init DB, create tables ...
setupDB(dbConfig);

// We want to store the sessions in RethinkDB
// so set the session store
var sessionsStore = new RDBStore({
  connectOptions:  dbConfig,
  table:           'sessions',
  sessionTimeout:  86400000,
  flushInterval:   60000
});

// Middleware that handles getting sessions from the session store
var sessionMiddleware = ExpressSession({
  secret: sessionsSecretKey,
  store:  sessionsStore,
  resave: false,
  saveUninitialized: true
});

var app = Express();

// serve static assets
app.use(cookieParserMiddleware)
app.use(Express.static('public'));
app.use(sessionMiddleware);

app.get('/', function(req, res) {
  // req.session.foo = new Date();
  // req.session.save(function(err) {
  //   res.sendFile(__dirname + '/public/app.html');
  // })
  res.sendFile(__dirname + '/public/app.html');
});

// Create the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});
var config = {
  io:            io
}
handleSockets(config);
handleGameLoop(io);
