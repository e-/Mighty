define(['util', 'config'], function(util, config){
  function Lobby(io){
    this.io = io;
    this.chatHistory = [];
  }
  
  Lobby.prototype = {
    onChatSubmitted: function(player, msg){
      if(msg.length == 0) return;
      var escaped = util.escape(player.name + ' : ' + msg);
      
      this.chatHistory.push(escaped);
      
      if(this.chatHistory.length > config.lobby.chatHistoryMaximumNumber)
        this.chatHistory = this.chatHistory.slice(this.chatHistory.length - config.lobby.chatHistoryMaximumNumber, this.chatHistory.length);

      this.io.emit('lobby/chat/add', escaped);
    },
    onLoggedIn: function(player){
      var self = this;
      player.socket.emit('login/success', {
        messages: self.chatHistory
      });
    }
  };

  return Lobby;
});
