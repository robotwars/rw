var Express        = require('express');

// Cookie parser middleware
var CookieParser   = require('cookie-parser');
var cookieParser   = CookieParser();

// Session middleware for Express
// https://github.com/expressjs/session
var ExpressSession = require('express-session');
var RDBStore       = require('express-session-rethinkdb')(ExpressSession);

var handleSockets  = require('./server/handleSockets.js');
var handleGameLoop = require('./server/handleGameLoop.js');
var setupDB        = require('./server/services/setupDB');

var sessionsSecretKey = 'my5uperSEC537(key)!';

var dbConfig = {
  db:     'rw',
  host:   'localhost',
  port:   28015
};

// init DB, create tables ...
setupDB(dbConfig);

var sessionsStore = new RDBStore({
  connectOptions:  dbConfig,
  table:           'sessions',
  sessionTimeout:  86400000,
  flushInterval:   60000
});

var expressSession = ExpressSession({
  secret: sessionsSecretKey,
  store:  sessionsStore,
  resave: false,
  saveUninitialized: true
});

var app = Express();

// serve static assets
app.use(cookieParser)
app.use(Express.static('public'));
app.use(expressSession);

app.get('/', function(req, res) {
  // test saving something on the session
  // console.log('session', req.session);
  req.session.foo = new Date();
  req.session.save(function(err) {
    res.sendFile(__dirname + '/public/app.html');
  })
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);

var config = {
  io:            io,
  cookieParser:  cookieParser,
  sessionsStore: sessionsStore
}

handleSockets(config);
handleGameLoop(config);
