define([
  'model/Suit',
  'model/Card',
  'model/Deck',
  'model/Game',
  'model/Player',
  'model/Lobby',
  'model/Hand',
  'model/Room'
], function(Suit, Card, Deck, Game, Player, Lobby, Hand, Room){
  return {
    Suit: Suit,
    Card: Card,
    Deck: Deck,
    Game: Game,
    Player: Player,
    Lobby: Lobby,
    Hand: Hand,
    Room: Room
  };
});
