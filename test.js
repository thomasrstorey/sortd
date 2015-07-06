var qsgen = require('./app/lib/qsgen.js');
var dgen = require('./app/lib/descriptgen.js');
var util = require('util');
console.log(qsgen.generateSteps("boyfriend").steps);
dgen.describe(qsgen.generateSteps("boyfriend").steps, function(stepsd){
    stepsd.forEach(function (step){
        console.log(step.description);
    });
});
