define(['model/Card', 'util'], function(Card, util){
  function Hand(cards){
    this.cards = cards;
  }

  Hand.fromJSON = function(json){
    var cards = [], hand = new Hand();
    json.cards.forEach(function(cardJSON){
      cards.push(Card.fromJSON(cardJSON));
    });

    hand.cards = cards;
    hand.sort();

    return hand;
  };

  Hand.prototype = {
    sort: function(){
      this.cards.sort(function(a, b){
        if(a.suit == b.suit) return a.rank - b.rank;
        return a.suit.charCodeAt(0) - b.suit.charCodeAt(0);
      });
    },
    discard: function(card){
      util.arrayRemove(this.cards, card);
    }
  };
  
  return Hand;
});
