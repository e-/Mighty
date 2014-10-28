define(function(){
  var routes = {
    'game/start': 'onGameStart',
    'game/turn/mine': 'onMyTurn'
  }

  function Rkdrnf(){
    this.handlers = {};
  }

  Rkdrnf.prototype = {
    emit: function(eventName){
      var args = Array.prototype.slice.call(arguments);
      this[routes[eventName]].apply(this, args.slice(1, args.length));
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
      console.log('handin!');
      this.handlers['game/turn/handIn']();
    }
  };

  return Rkdrnf;
});
