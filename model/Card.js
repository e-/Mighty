define(function(){
  function Card(suit, rank /* 1 to 13 */ ){
    this.suit = suit;
    this.rank = rank; 
    this.rankName = getRankName(rank);
  }

  var rankToName = {
    0: '', // for joker
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K'
  };

  function getRankName(rank){
    if(2 <= rank && rank <= 10) return rank + '';
    return rankToName[rank];
  }

  Card.prototype = {
    toString: function(){
      return this.suit[0] + this.rankName;
    }
  };

  return Card;
});
