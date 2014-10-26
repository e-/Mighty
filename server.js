var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require
});

requirejs([
  'express',
  'model/Suit'
], function(
  express,
  Suit
){
  var app = express();

  app.get('/', function(req, res){
    res.send(Suit.Spade);
  });

  app.listen(3000);
});
