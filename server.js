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
  
  var history = [];
  io.on('connection', function(socket){
    history.forEach(function(h){
      socket.emit('lobby/chat/add', h);
    });

    socket.on('lobby/chat/submit', function(msg){
      var escaped = util.escape(msg);
      history.push(escaped);
      history = history.slice(history.length - 10 < 0 ? 0 : history.length - 10, history.length);

      io.emit('lobby/chat/add', escaped);
    });
  });

  server.listen(3000, function(){
    console.log('The sever started at 3000');
  });
});
