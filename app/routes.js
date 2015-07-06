// sortd web app routing file
// frontenda and api paths
module.exports = function (app){
  var path = require('path');
  var qsgen = require('./lib/qsgen.js');
  var dgen = require('./lib/descriptgen.js');
  var templater = require(path.join(__dirname, './lib/templater.js'));

  app.get('/sort', function (req, res){
    templater.compilePage("sort", function(page){
      res.send(page);
    });
  });

  app.get('/about', function (req, res){
    templater.compilePage("about", function(page){
      res.send(page);
    });
  });

  app.get('/api/show', function(req, res){
    res.send("<h1>"+req.query.id+"</h1>");
  });

  app.post('/api/sort', function(req, res){
    var prob = req.body.problem;
    console.log(prob);
    dgen.describe(qsgen.generateSteps(prob).steps, function(stepsd){
        stepsd.forEach(function (step){
            console.log(step.description);
        });
        res.send(stepsd);
    });
  });

  app.get('/', function (req, res){
    templater.compilePage("main", function(page){
      res.send(page);
    });
  });

};
