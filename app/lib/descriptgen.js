// sorting step description generator
// for sortd
// Thomas R Storey
// 7.5.15

module.exports = (function (){

  var _ = require('lodash');
  var path = require('path');
  var jf = require('jsonfile');
  var that = {};

  function loadVocab(path, cb){
    var vocabulary = {};
    jf.readFile(path, function(err, obj){
      if(err){
        throw err;
      } else {
        return cb(obj);
      }
    });
  }

  function describe(steps, cb){
    // iterate through each object in the steps array, adding the description
    // property for each.
    loadVocab(path.join(__dirname, '../assets/vocabulary.json'), function (vocabulary){
      _.forEach(steps, function(step, index, arr){
        step.description = generate(step.src, step.dest, step.beforeStr.split(''), index, arr.length, vocabulary);
      });
      return cb(steps);
    });
  }

  function generate (src, dest, arr, step, length, vocab){
    var selection = {
      src : arr[src],
      srci : src,
      dest : arr[dest],
      desti : dest,
      order : '',
      adverb : '',
      verb : '',
      iterm1 : '',
      cterm1 : '',
      iterm2 : '',
      cterm2 : ''
    };
    if(selection.src === " "){
      selection.src = "space";
    }
    if(selection.dest === " "){
      selection.dest = "space";
    }
    var template = _.template(vocab.template);
    var otype = "first";
    if(step > 0){
      otype = "intermediate";
    }
    if(step === length-1) {
      otype = "last";
    }
    selection.order = _.sample(vocab.order[otype]);
    for (var s in selection) {
      if (selection[s] === '') {
        selection[s] = _.sample(vocab[s]);
      }
    }
    var compiled = template(selection);
    if(_.startsWith(compiled, " ")){
      compiled = _.capitalize(_.trimLeft(compiled));
    }
    compiled = compiled.replace(/\s{2}/g, " ");
    return compiled;
  }

  that.describe = describe;
  that.generate = generate;

  return that;
})();
