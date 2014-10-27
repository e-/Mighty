define([
  'model/Suit',
  'model/Card',
  'model/Deck',
  'model/Game',
  'model/Player',
  'model/Lobby',
  'model/Hand'
], function(Suit, Card, Deck, Game, Player, Lobby, Hand){
  return {
    Suit: Suit,
    Card: Card,
    Deck: Deck,
    Game: Game,
    Player: Player,
    Lobby: Lobby,
    Hand: Hand
  };
});
