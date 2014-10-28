define(function(){
  function Player(name, socket){
    this.name = name;
    this.socket = socket;
  }
  
  Player.getRandomName = function(){
    return 'Player' + Math.floor(Math.random() * 10000);
  };
  
  Player.fromJSON = function(json){
    var player = new Player(json.name);
    return player;
  };

  Player.prototype = {
    emit: function(){
      this.socket.emit.apply(this.socket, arguments);
      return this;
    },
    on: function(eventName, handler) {
      this.socket.on(eventName, handler);
      return this;
    }, 
    off: function(eventName){
      this.socket.removeAllListeners(eventName);
      return this;
    },
    join: function(room){
      this.room = room;
      this.socket.join(room.id);
      return this;
    },
    leave: function(room){
      delete this.room;
      this.socket.leave(room.id);
      return this;
    },
    toJSON: function(){
      return {name: this.name};
    }
  };

  return Player;
});
