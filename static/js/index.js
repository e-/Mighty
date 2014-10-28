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
  var hand;

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

  socket.on('lobby/chat/add', function(msg){
    $('#messages').append('<li>'+msg+'</li>');
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  });
  
  socket.on('game/start', function(myId, handJSON){
    hand = model.Hand.fromJSON(handJSON);

    hand.cards.forEach(function(card){
      var card$ = card.get$();
      $('#hand0').append(card$);
    });
    UI.arrangeMyHand(hand.cards.length);
    UI.createOthersHand(hand.cards.length);
    UI.arrangeHand(1, hand.cards.length);
    UI.arrangeHand(2, hand.cards.length);
    UI.arrangeHand(3, hand.cards.length);
    UI.arrangeHand(4, hand.cards.length);
  });

  socket.on('game/turn/mine', function(){
    $('#hand0 .card').on('click', function(){
      var $this = $(this),
          card = $this.data('card');
      UI.moveCard($this, UI.getTableCardCenter(0));
      $this.remove();
      util.arrayRemove(hand.cards, card);
      UI.arrangeMyHand(hand.cards.length);
      
      socket.emit('game/turn/handIn');
      $('#hand0 .card').off('click');
    });
  });
  
  socket.on('game/turn/otherHandIn', function(globalPlayerNumber){
    var $card = $('#hand' + globalPlayerNumber + ' .card').first(),
        pos = UI.getPlayerCardCenter(globalPlayerNumber);

    $card.css('left', pos[0]).css('top', pos[1]);

    UI.moveCard(
      $card,
      UI.getTableCardCenter(globalPlayerNumber)
    );
    console.log(globalPlayerNumber);
  });

  $('#chat').submit(function(){
    var value = $('#chat-value').val();
    if(value.length == 0)return false;
    socket.emit('lobby/chat/submit', value);
    $('#chat-value').val('');
    return false;
  });
});
