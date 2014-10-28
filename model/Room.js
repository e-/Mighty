define(['util', 'config'], function(util, config){
  function Room(title, io){
    this.id = util.getUID();
    this.title = title || 'New room';
    this.io = io;
    this.players = [];
  }
  Room.fromJSON = function(json){
    var room = new Room();
    room.id = json.id;
    room.title = json.title;
    return room;
  };

  Room.prototype = {
    join: function(player){
      if(this.players.length >= config.room.playerMaximumNumber) {
        player.emit('room/join/failed');
        return;
      }
      
      this.players.push(player);
      player
        .join(this)
        .emit('room/join/success', this.toJSON());
      
      this.io.to(this.id).emit('room/update', this.players);
    },
    leave: function(player){
      util.arrayRemove(this.players, player);
      player
        .leave(this)
        .emit('room/leave');
      this.io.to(this.id).emit('room/update', this.players);
    },
    toJSON: function(){
      return { id : this.id, title: this.title };
    },
    onChatSubmitted: function(player, msg){
      if(msg.length == 0) return;
      var escaped = util.escape(msg);
      
      this.io.to(this.id).emit('room/chat/add', this.players.indexOf(player), escaped);
    },
  };

  return Room;
});
