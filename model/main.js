define([
  'model/Suit',
  'model/Card',
  'model/Deck',
  'model/Game',
  'model/Player',
  'model/Lobby'
], function(Suit, Card, Deck, Game, Player, Lobby){
  return {
    Suit: Suit,
    Card: Card,
    Deck: Deck,
    Game: Game,
    Player: Player,
    Lobby: Lobby
  };
});
