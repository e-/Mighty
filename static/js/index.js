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
  'model',
  'UI',
  'config',
  'util'
], function(socketio, $, model, UI, config, util){
  var socket = socketio();
 
  socket.emit('login/try');
  socket.on('login/success', function(json){
    json.messages.forEach(function(msg){
      $('#messages').append('<li>'+msg+'</li>');
    });
    $('#messages').scrollTop($('#messages').height());
  });
  
  socket.on('lobby/update', function(json){
    $('#online-player-count').html(json.onlinePlayerCount);
  });

  $('#chat').submit(function(){
    var value = $('#chat-value').val();
    if(value.length == 0)return false;
    socket.emit('lobby/chat/submit', value);
    $('#chat-value').val('');
    return false;
  });

  socket.on('lobby/chat/add', function(msg){
    $('#messages').append('<li>'+msg+'</li>');
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  });
  
  socket.on('game/start', function(handJSON){
    var hand = model.Hand.fromJSON(handJSON);

    hand.cards.forEach(function(card){
      var card$ = card.get$();
      $('#hand').append(card$);
      card$.on('click', function(){
        var
            screenWidth = $(window).width(),
            screenHeight = $(window).height();
 
        var $this = $(this),
            $dummy = $this.clone().appendTo($('body')),
            offset = $this.offset()
        $dummy
          .removeClass('mine')
          .css('left', offset.left)
          .css('top', offset.top)
          .animate({
            left: screenWidth / 2 - config.UI.card.width / 2 ,
            top: screenHeight / 2 - config.UI.card.height / 2
          }, 250)
        ;
        $this.remove();
        util.arrayRemove(hand.cards, card);
        UI.arrangeHand(hand.cards.length);
      });
    });
    UI.arrangeHand(hand.cards.length);
  });
});
