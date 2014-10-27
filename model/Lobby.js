define(['util', 'config'], function(util, config){
  function Lobby(io){
    this.io = io;
    this.chatHistory = [];
  }
  
  Lobby.prototype = {
    onChatSubmitted: function(msg){
      var escaped = util.escape(msg);
      
      this.chatHistory.push(escaped);
      
      if(this.chatHistory.length > config.lobby.chatHistoryMaximumNumber)
        this.chatHistory = this.chatHistory.slice(this.chatHistory.length - config.lobby.chatHistory, this.chatHistory.length);

      this.io.emit('lobby/chat/add', escaped);
    },
    onConnected: function(socket){
      this.chatHistory.forEach(function(h){
        socket.emit('lobby/chat/add', h);
      });
    }
  };

  return Lobby;
});
