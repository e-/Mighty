var requirejs = require('requirejs');

requirejs.config({
  path: {
    util: './util'
  },
  packages: ['model'],
  nodeRequire: require
});

requirejs([
  'express',
  'http',
  'socket.io',

  'util',

  'model',
], function(
  express,
  http,
  socketio,

  util,

  model
){
  var 
      app = express(),
      server = http.Server(app), // refer to http://socket.io/docs/
      io = socketio(server);

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/static'));

  app.get('/', function(req, res){
    res.render('index');
  });
  
  io.on('connection', function(socket){
    console.log('connected');
    socket.on('lobby/chat/submit', function(msg){
      io.emit('lobby/chat/add', util.escape(msg));
    });

  });

  server.listen(3000, function(){
    console.log('The sever started at 3000');
  });
});
