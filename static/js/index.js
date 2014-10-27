requirejs.config({
  baseUrl: 'js',
  paths: {
    'socket.io': '../socket.io/socket.io',
    'jquery': 'lib/jquery-2.1.1.min'
  },
  packages: ['model']
});

requirejs([
  'socket.io', 
  'jquery',
  'model'
], function(socketio, $, model){
  var socket = socketio();
  
  $('#chat').submit(function(){
    socket.emit('lobby/chat/submit', $('#chat-value').val());
    $('#chat-value').val('');
    return false;
  });

  socket.on('lobby/chat/add', function(msg){
    $('#messages').append('<li>'+msg+'</li>');
  });
  
  socket.on('game/start', function(handJSON){
    var hand = model.Hand.fromJSON(handJSON);

    hand.cards.forEach(function(card){
      $('#hand').append(card.get$());
    });
  });
});
