// sortd web app routing file
// frontenda and api paths
module.exports = function (app){
  var path = require('path');
  var qsgen = require('./lib/qsgen.js');
  var dgen = require('./lib/descriptgen.js');
  var jf = require('jsonfile');
  jf.spaces = 2;
  var templater = require(path.join(__dirname, './lib/templater.js'));

  app.get('/sort', function (req, res){
    templater.compilePage(["sort"], function(page){
      res.send(page);
    });
  });

  app.get('/show', function(req, res){
    templater.compilePage(["show", "renderer", "loading", "share"], function(page){
      res.send(page);
    });
  });

  app.get('/about', function (req, res){
    templater.compilePage(["about"], function(page){
      res.send(page);
    });
  });

  app.get('/api/show', function(req, res){
    var filepath = path.join(__dirname, '/db/', req.query.id + '.json');
    console.log("retrieving: " + filepath);
    jf.readFile(filepath, function(err, data){
      if(err) console.log(err);
      res.send(data);
    })
  });

  app.post('/api/sort', function(req, res){
    var prob = req.body.problem.value;
    console.log(prob);
    var stepsObj = qsgen.generateSteps(prob);
    dgen.describe(stepsObj.steps, function(stepsd){
        var hash = require('crypto').createHash('md5').update(prob.replace(' ', '_') + Date.now(), 'utf8').digest('hex');
        var filename = hash + ".json";
        var filepath = path.join(__dirname, '/db/', filename);
        console.log("writing: " + filepath);
        stepsObj.steps = stepsd;
        stepsObj.endText = stepsObj.steps[stepsObj.steps.length-1].afterStr;
        jf.writeFile(filepath, stepsObj, function(err){
          if(err) console.log(err);
          res.send(hash);
        });
    });
  });

  app.get('/', function (req, res){
    templater.compilePage(["main"], function(page){
      res.send(page);
    });
  });

};
