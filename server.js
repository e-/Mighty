var requirejs = require('requirejs');

requirejs.config({
  path: {
    util: './util',
    config: './config',
    ai: './ai'
  },
  packages: ['model', 'ai'],
  nodeRequire: require
});

requirejs([
  'express',
  'http',
  'socket.io',

  'util',
  'config',

  'model',
  'ai'
], function(
  express,
  http,
  socketio,

  util,
  config,

  model,
  ai
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
  
  var lobby = new model.Lobby(io),
      players = [],
      playerHash = {};
  io.on('connection', function(socket){
    var id = socket.id,
        player = new model.Player(model.Player.getRandomName(), socket);
    
    players.push(player);
    playerHash[id] = player;

    io.emit('lobby/update', {
      onlinePlayerCount: players.length
    });
    
    lobby.onLoggedIn(player);

    socket.on('lobby/chat/submit', function(msg){
      lobby.onChatSubmitted(player, msg);
    });
    
    var Game = new model.Game([
      player, 
      new ai.Rkdrnf(),
      new ai.Rkdrnf(),
      new ai.Rkdrnf(),
      new ai.Rkdrnf()
    ]);
    Game.run();

    socket.on('disconnect', function(){
      util.arrayRemove(players, player);
      delete playerHash[player.id];
      io.emit('lobby/update', {
        onlinePlayerCount: players.length
      });
    });
  });

  server.listen(3000, function(){
    console.log('The sever started at 3000.');
  });
});
