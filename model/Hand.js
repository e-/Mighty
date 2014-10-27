define(['model/Card'], function(Card){
  function Hand(){
    this.cards = [];
  }

  Hand.fromJSON = function(json){
    var cards = [], hand = new Hand();
    json.forEach(function(cardJSON){
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
    }
  };
  
  return Hand;
});
