define(['util'], function(util){
  var routes = {
    'game/start': 'onGameStart',
    'game/turn/mine': 'onMyTurn'
  };

  function Rkdrnf(){
    this.handlers = {};
  }

  Rkdrnf.info = {
    name: 'rkdrnf.js',
    description: '안준형군의 마이티 플레이를 충실하고 완전하게 구현한 인공지능 플레이업니다. 손에 있는 패 중 하나를 랜덤으로 냅니다.'
  };

  Rkdrnf.prototype = {
    emit: function(eventName){
      var args = Array.prototype.slice.call(arguments);
      var handler = this[routes[eventName]];
      if(handler) handler.apply(this, args.slice(1, args.length));
    },
    on: function(eventName, handler){
      this.handlers[eventName] = handler;
    },
    off: function(eventName) {
      delete this.handlers[eventName];
    },
    onGameStart: function(hand){

    },
    onMyTurn: function(){
      var handler = this.handlers['game/turn/handIn'],
          card = this.hand.cards[0];
      this.hand.discard(card);
      setTimeout(function(){
        handler(card);
      }, 1000);
    }
  };

  return Rkdrnf;
});
