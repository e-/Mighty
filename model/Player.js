define(function(){
  function Player(name, socket){
    this.name = name;
    this.socket = socket;
  }
  
  Player.getRandomName = function(){
    return 'Player' + Math.floor(Math.random() * 10000);
  };

  Player.prototype = {
    emit: function(){
      this.socket.emit.apply(this.socket, arguments);
    },
    on: function(eventName, handler) {
      this.socket.on(eventName, handler);
    }, 
    off: function(eventName){
      this.socket.removeAllListeners(eventName);
    }
  };

  return Player;
});
