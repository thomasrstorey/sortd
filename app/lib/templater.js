module.exports = (function (){
  var that = {};
  var path = require('path');
  var handlebars = require('handlebars');
  var fs = require('fs');
  var jf = require('jsonfile');
  jf.spaces = 2;
  function compilePage(pages, cb){
    // setup parameters
    var params = {};
    pages.forEach(function(page){
      params[page] = true;
    });
    if(pages.some(function(v){return v === "sorted"})){
        // get json files, put start and end text and link in an object
        params["problems"] = [];
        getSortedProblems(params, function(params){
          registerPartials(pages, params, cb);
        });
    } else {
      registerPartials(pages, params, cb);
    }
  };

  function registerPartials(pages, params, cb){
    // register partials
    loadPartials(pages, function(){
      // render template
      loadIndex(function(source){
        console.dir(params);
        var template = handlebars.compile(source);
        return cb(template(params));
      });
    });
  }

  function getSortedProblems(params, cb){
    fs.readdir(path.join(__dirname, '../db/'), function(err, files){
      files.forEach(function(v, i){
        jf.readFile(path.join(__dirname, '../db/', v), {encoding: 'utf8'}, function(err, data){
          if(err) throw err;
          params["problems"].push({
                                    startText: data.startText,
                                    endText: data.endText,
                                    link: "/show?id="+v.slice(0, -5)
                                  });
          if(params["problems"].length === files.length) return cb(params);
        });
      });
    });
  }

  function loadPartials(nameArr, cb){
    var l = nameArr.length;
    nameArr.forEach(function(name){
      readPartial(name, function(pobj){
          l--;
          handlebars.registerPartial(pobj.name, pobj.data);
          if(!l) cb();
      });
    });
  };

  function readPartial(name, cb){
    fs.readFile(path.join(__dirname, '../templates/partials', name+'.handlebars'),
    {encoding: 'utf8'}, function(err, data){
      if(err) throw err;
      cb({name: name, data: data});
    });
  };

  function loadIndex (cb){
    fs.readFile(path.join(__dirname, '../templates/index.handlebars'),
    {encoding: 'utf8'}, function(err, data){
      if(err) throw err;
      cb(data);
    });
  };

  that.compilePage = compilePage;

  return that;

})();
