module.exports = (function (){
  var that = {};
  var path = require('path');
  var handlebars = require('handlebars');
  var fs = require('fs');

  function compilePage(page, cb){
    // setup parameters
    var params = {
      main: false,
      about: false,
      sort: false,
    };
    params[page] = true;
    // register partials
    loadPartials([page, 'loading', 'share'], function(){
      // render template
      loadIndex(function(source){
        var template = handlebars.compile(source);
        return cb(template(params));
      });
    });
  };

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
