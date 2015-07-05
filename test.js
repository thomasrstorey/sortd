// var dgen = require('./app/lib/descriptgen.js');
// var steps = [
//   {src: 3, dest: 5, str: "boyfriend", description: ''},
//   {src: 1, dest: 6, str: "boyfriend", description: ''},
//   {src: 7, dest: 4, str: "boyfriend", description: ''},
//   {src: 2, dest: 5, str: "boyfriend", description: ''},
//   {src: 8, dest: 5, str: "boyfriend", description: ''},
//   {src: 3, dest: 4, str: "boyfriend", description: ''}
// ];
// dgen.describe(steps, function(stepsd){
//   stepsd.forEach(function (step){
//       console.log(step.description);
//   });
// });

var qsgen = require('./app/lib/qsgen.js');
var dgen = require('./app/lib/descriptgen.js');
var util = require('util');
console.log(qsgen.generateSteps("boyfriend").steps);
dgen.describe(qsgen.generateSteps("boyfriend").steps, function(stepsd){
    stepsd.forEach(function (step){
        console.log(step.description);
    });
});
