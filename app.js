var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('./dbcon.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8554);
app.use(express.static('static'));

//render GET for homepage
app.get('/',function(req,res,next){
   var context = {};
   mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
      if(err){
         next(err);
         return;
      }
      
      context.results = rows;
      res.render('home', context);
   }
});

//render POST for homepage
app.post('/',function(req,res,next){
   var context = {};
   //store body parameters
   var bParams = [];
   for (var p in req.body){
      bParams.push({'name':p,'value':req.body[p]})
   }
  
   context.bodyList = bParams;
   res.render('home', context);
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('db',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
