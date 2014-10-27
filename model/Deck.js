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
 
  Deck.fromJSON = function(json){
    var cards = [], deck = new Deck();
    json.forEach(function(cardJSON){
      cards.push(Card.fromJSON(cardJSON));
    });

    deck.cards = cards;

    return deck;
  };

  Deck.prototype = {
    shuffle: function(){
      var i, self = this;
      for(i = 0; i < 1000; ++i){
        var i1 = Math.floor(Math.random() * self.cards.length),
            i2 = Math.floor(Math.random() * self.cards.length),
            temp;

        temp = self.cards[i1];
        self.cards[i1] = self.cards[i2];
        self.cards[i2] = temp;
      }
    },
    toString: function(){
      return this.cards.map(function(card){return card.toString();}).join(' ');
    }
  };

  return Deck;
});
