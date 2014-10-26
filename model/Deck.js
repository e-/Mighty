define(['model/Suit', 'model/Card'], function(Suit, Card){
  function Deck(){
    var self = this;

    this.cards = [];
    
    Object.keys(Suit).forEach(function(suit){
      if(Suit[suit] == Suit.Joker) return;
      var i;
      for(i = 1; i <= 13; ++i) {
        self.cards.push(new Card(Suit[suit], i));
      }
    });

    self.cards.push(new Card(Suit.Joker, 0));
  }
  
  Deck.prototype = {
    shuffle: function(){

    },
    toString: function(){
      return this.cards.map(function(card){return card.toString();}).join(' ');
    }
  };

  return Deck;
});
