// sortd web app routing file
// frontenda and api paths
module.exports = function (app){
  var path = require('path');
  var qsgen = require('./lib/qsgen.js');
  var dgen = require('./lib/descriptgen.js');
  var jf = require('jsonfile');
  jf.spaces = 2;
  var crypto = require('crypto');
  var templater = require(path.join(__dirname, './lib/templater.js'));
  var md5 = crypto.createHash('md5');
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
    var stepsObj = qsgen.generateSteps(prob);
    dgen.describe(stepsObj.steps, function(stepsd){
        var filename = md5.update(prob.replace(' ', '_') + Date.now(), 'utf8').digest('hex') + ".json";
        var filepath = path.join(__dirname, '/db/', filename);
        console.log("writing: " + filepath);
        stepsObj.steps = stepsd;
        stepsObj.endText = stepsObj.steps[stepsObj.steps.length-1].afterStr;
        jf.writeFile(filepath, stepsObj, function(err){
          if(err) console.log(err);
          res.send(stepsd);
        });
    });
  });

  app.get('/', function (req, res){
    templater.compilePage("main", function(page){
      res.send(page);
    });
  });

};
