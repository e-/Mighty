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
      playerHash = {}, 
      rooms = [];

  var testRoom = new model.Room(null, io);
  
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
      if(!player.room)
        lobby.onChatSubmitted(player, msg);
    });
    
    socket.on('room/chat/submit', function(msg){
      if(player.room)
        player.room.onChatSubmitted(player, msg);
    });
    
    testRoom.join(player);
    
    socket.on('game/start/try', function(){
      testRoom.onGameStartTry(player);
    });

    socket.on('disconnect', function(){
      if(player.room)
        player.room.leave(player);
      util.arrayRemove(players, player);
      delete playerHash[player.id];
      io.emit('lobby/update', {
        onlinePlayerCount: players.length
      });
    });
  });

  server.listen(config.server.port, function(){
    console.log('The sever started at ' + config.server.port + '.');
  });
});
