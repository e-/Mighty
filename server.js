var requirejs = require('requirejs');

requirejs.config({
  path: {
    util: './util',
    config: './config'
  },
  packages: ['model'],
  nodeRequire: require
});

requirejs([
  'express',
  'http',
  'socket.io',

  'util',
  'config',

  'model',
], function(
  express,
  http,
  socketio,

  util,
  config,

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
  
  var Lobby = new model.Lobby(io);
  io.on('connection', function(socket){
    Lobby.onConnected(socket);
    socket.on('lobby/chat/submit', function(msg){Lobby.onChatSubmitted(msg);});
    
    var Game = new model.Game(socket);
    Game.run();
  });

  server.listen(3000, function(){
    console.log('The sever started at 3000.');
  });
});
