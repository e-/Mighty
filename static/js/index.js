requirejs.config({
  baseUrl: 'js',
  paths: {
    'socket.io': '../socket.io/socket.io',
    'jquery': 'lib/jquery-2.1.1.min'
  }
});

requirejs([
  'socket.io', 
  'jquery',
  'model/Suit'
], function(socketio, $, Suit){
  var socket = socketio();
  
  $('#chat').submit(function(){
    socket.emit('lobby/chat/submit', $('#chat-value').val());
    $('#chat-value').val('');
    return false;
  });

  socket.on('lobby/chat/add', function(msg){
    $('#messages').append('<li>'+msg+'</li>');
  });
});
