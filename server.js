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
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/static'));

  app.get('/', function(req, res){
    res.render('index');
  });

  app.listen(3000);
});
