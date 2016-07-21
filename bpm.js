/**
* Beats per minute - Craig Palermo, 7/20/16
*/

(function() {
  /**
  * Returns currentIndex + 1 if currentIndex is less than the upper bound,
  * otherwise returns 0
  */
  function getNextIndex(currentIndex, upperBound) {
    return currentIndex < upperBound ? currentIndex + 1 : 0;
  }

  /**
  * Given two datetimes, returns the difference in seconds
  */
  function getSecondsDifference(start, end) {
    return (end.getTime() - start.getTime()) / 1000;
  }

  /**
  * Returns the average of all numbers in array
  */
  function average(arr) {
    var total = 0;

    // Get the sum of all non-null elements in array, and keep track of
    // how many there are
    var sum = arr.reduce(function(cur, acc) {
      if (!isNaN(cur)) {
        total += 1;
        return cur + acc;
      }
      return acc;
    }, 0);

    return sum / total;
  }

  /**
  * Converts beats per second to beats per minute
  */
  function bpsToBpm(bps) {
    return 60 / bps;
  }

  $(document).ready(function() {
    var maxArrLength = 10;
    var placeholderString = '--';
    var diffs;
    var index;
    var lastUpdateTime;

    // Get input and display elements
    var input = $('#tapInput');
    var display = $('#display');
    var resetBtn = $('#resetBtn');

    /**
    * Initialize array and counter values
    */
    function reset() {
      diffs = [];
      index = 0;
      lastUpdateTime = null;
      display.html(placeholderString);
      input.focus();
    }

    /**
    * Update diffs array when a key is pressed in the input field
    */
    function keyPressed() {
      var now = new Date();
      var currentBpm;

      // Clear the input field
      this.value = null;

      if (!!lastUpdateTime) {
        var secondsDifference = getSecondsDifference(lastUpdateTime, now);
        diffs[index] = bpsToBpm(secondsDifference);
        currentBpm = average(diffs);
        index = getNextIndex(index, maxArrLength);
      }

      lastUpdateTime = new Date();
      display.html(currentBpm);
    }

    // Set initial values
    reset();

    // Focus input on page load
    input.focus();

    // Event listeners
    input.on('keydown', keyPressed);
    resetBtn.on('click', reset);
  });
})();
