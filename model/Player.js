define(function(){
  function Player(name, socket){
    this.name = name;
    this.socket = socket;
  }
  
  Player.getRandomName = function(){
    return 'Player' + Math.floor(Math.random() * 10000);
  };

  Player.prototype = {
  };

  return Player;
});
