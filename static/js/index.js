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
    UI.arrangeHand(1)
    UI.arrangeHand(2)
    UI.arrangeHand(3)
    UI.arrangeHand(4)
  });

  socket.on('game/turn/mine', function(){
    $('#hand0 .card').on('click', function(){
      var $this = $(this),
          card = $this.data('card');
      UI.moveCard($this, null, UI.getTableCardCenter(0));
      $this.remove();
      util.arrayRemove(hand.cards, card);
      UI.arrangeMyHand(hand.cards.length);
      
      socket.emit('game/turn/handIn', card);
      $('#hand0 .card').off('click');
    });
  });
  
  socket.on('game/turn/otherHandIn', function(globalPlayerNumber, cardJSON){
    var card = model.Card.fromJSON(cardJSON),
        $card = card.get$(),
        pos = UI.getPlayerCardCenter(globalPlayerNumber),
        $hand = $('#hand' + globalPlayerNumber);
    UI.moveCard(
      $card,
      pos,
      UI.getTableCardCenter(globalPlayerNumber)
    );
    $hand.find('.card').last().remove();
    UI.arrangeHand(globalPlayerNumber);
  });

  socket.on('game/turn/end', function(){
    var $cards = $('body > .card');
    setTimeout(function(){ // wait until last players' animation end
      var pos = UI.getPlayerCardCenter(0);
      $cards.stop().animate({
        left: pos[0] - config.UI.card.width / 2,
        top: pos[1]
      }, function(){
        $cards.remove();
      });
    }, 1000);
  });

  $('#chat').submit(function(){
    var value = $('#chat-value').val();
    if(value.length == 0)return false;
    socket.emit('lobby/chat/submit', value);
    $('#chat-value').val('');
    return false;
  });
});
