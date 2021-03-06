define(['model/Deck', 'model/Hand'], function(Deck, Hand){
  function Game(players){
    this.players = players;
    this.isPlaying = false;
  }

  Game.prototype = {
    stop: function(){
      this.isPlaying = false;
      this.players.forEach(function(player){
        player.emit('game/stopped');
      });
    },
    run: function(){
      this.isPlaying = true;

      // 덱 만들기 
      var self = this,
          deck = new Deck();

      // 딜미스 없을 때까지 셔플 
      deck.shuffle();
      
      this.players.forEach(function(player, i){
        var hand = new Hand(deck.cards.slice(i * 10, (i + 1) * 10));
        player.hand = hand;
        player.emit('game/started', i, player.hand);
      });

      // 플레이어 자리 섞기
      
      var roundNumber = 0, playerNumber = 0, handInCount = 0;
      
      function handIn(card){
        var player = self.players[playerNumber],
            nextPlayer,
            nextPlayerNumber;

        nextPlayerNumber = (playerNumber + 1) % 5;
        nextPlayer = self.players[nextPlayerNumber];
        
        player.off('game/turn/handIn');
        handInCount++;

        if(!self.isPlaying) { //stopped
          return;
        }
       
        self.players.forEach(function(otherPlayer){
          if(player != otherPlayer) {
            otherPlayer.emit('game/turn/otherHandIn', playerNumber, card);
          }
        });

        if(handInCount == 5) {
          roundNumber++;
          handInCount = 0;
          
          self.players.forEach(function(player){
            player.emit('game/turn/end', 0);
          });
        }
        playerNumber = nextPlayerNumber;
        nextPlayer.on('game/turn/handIn', handIn);
        nextPlayer.emit('game/turn/mine');
      }

      this.players[playerNumber].on('game/turn/handIn', handIn);  
      this.players[playerNumber].emit('game/turn/mine');


      // 공약

      // 주공 결정

      // 최종 공약 결정 및 카드 버리기

      // 프렌드 결정

      // 게임 로직

        // 각 플레이어 카드 냄. 낼 수 있는 카드인지 확인
        
        // 라운드 승자 결정

        // 점수 환산 및 선턴 플레이어 결정 

      // 결과 및 점수 환산

      // 다시 시작
    }
  };



  return Game;
});
