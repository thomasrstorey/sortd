// quicksort step generator
// for sortd
// Thomas R Storey <storey.thomas@gmail.com>
// 7.4.15

module.exports = (function (){

  // object to export
  var that = {};
  var _ = require('lodash');

  // public method, takes a string and outputs steps data structure as an object
  function generateSteps (str){
    var process = {
      startText : str,
      endText : "",
      steps : []
    };
    var arr = str.split('');

    process.steps = qsort(arr, 0, arr.length-1, []);
    process.endText = process.steps[process.steps.length-1].str;
    return process;
  }

  // private method, performs a recursive quicksort on a string, adds steps to
  //  a given steps array as it goes, returns the finished array.
  // quicksort(A, lo, hi):
  function qsort (arr, lo, hi, steps){
    if(lo < hi){
        var partObj = partition(arr, lo, hi);
        partObj.steps.forEach(function (obj){
          steps.push(obj);
        })
        qsort(arr, lo, partObj.i - 1, steps);
        qsort(arr, partObj.i + 1, hi, steps);
    }
    return steps;
  }

  // this should work as long as the changes made to the internals of the array
  // propagate to the original array object (they should!)
  function partition (arr, lo, hi){
    var stepsArr = [];
    var curr = arr.slice(0);
    var pi = hi;
    var pv = arr[pi];
    var storei = lo;
    // Iterate across the span from lo to hi
    for(var i = lo; i <= hi; i++){
      // if there are any smaller than the pivot value, swap it with one of
      // the earlier entries. This ensures that things lower than the pivot
      // are on the left and things greater are on the right.
      if(arr[i] < pv){
        var tmp = arr[i];
        curr = arr.slice(0);
        arr[i] = arr[storei];
        arr[storei] = tmp;
        // only store moves that actually swap values (not swapping with itself)
        if(storei != i) {
          stepsArr.push( { src: i, dest: storei, beforeStr: curr.join(''),
          afterStr: arr.join(''), description: '' });
        }
        storei++;
      }
    }
    // now, swap the pivot with the first value greater than the pivot.
    // the pivot is now in its correct position.
    curr = arr.slice(0);
    var tmp = arr[storei];
    arr[storei] = arr[pi];
    arr[pi] = tmp;
    // store the pivot swap
    stepsArr.push({ src: pi, dest: storei, beforeStr: curr.join(''),
                    afterStr: arr.join(''), description: '' });
    // return our pivot location and the steps it took to get there.
    return {i : storei, steps: stepsArr};
  }

  // put public methods in exported object
  that.generateSteps = generateSteps;

  return that;
})();
