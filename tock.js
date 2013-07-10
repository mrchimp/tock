/**
* Tock by Mr Chimp - github.com/mrchimp/tock
* Based on code by James Edwards:
*    sitepoint.com/creating-accurate-timers-in-javascript/
*/
function Tock = (function() {
  var go = false,
      interval = options.interval || 10,
      countdown = options.countdown || false,
      final_time = 0,
      callback = options.callback,
      complete = options.complete;


  /**
   * Reset the clock
   */
  function reset() {
    if (this.countdown) {
      return false;
    }
    this.stop();
    this.start_time = 0;
    this.time = 0;
    this.elapsed = '0.0';
  };

  /**
   * Start the clock.
   */
  function start(time) {
    if (this.countdown) {
      this._startCountdown(time);
    } else {
      this._startTimer();
    }
  };  
    
  
  /**
   * Called every tick for countdown clocks.
   * i.e. once every this.interval ms
   */
  function _tick() {
    this.time += this.interval;
    this.elapsed = Math.floor(this.time / this.interval) / 10;

    if (Math.round(this.elapsed) === this.elapsed) { this.elapsed += '.0'; }

    var t = this,
        diff = (Date.now() - this.start_time) - this.time,
        next_interval_in = this.interval - diff;

    if (this.callback !== undefined) {
      this.callback(this);
    }

    if (this.countdown && (this.duration_ms - this.time < 0)) {
      this.final_time = 0;
      this.go = false;
      this.complete();
    }

    if (next_interval_in <= 0) {
      missed_ticks = Math.floor(Math.abs(next_interval_in) / this.interval)
      this.time += missed_ticks * this.interval
      if (this.go) {
        this._tick();
      }
    } else {
      if (this.go) {
        this.timeout = window.setTimeout(function () { t._tick(); }, next_interval_in);
      }
    }
  };

  /**
   * Stop the clock.
   */
  function stop() {
    this.go = false;
    this.final_time = (Date.now() - this.start_time);
    window.clearTimeout(this.timeout);
  };
  
  /**
   * Get the current clock time in ms.
   * Use with Tock.msToTime() to make it look nice.
   */
  function lap() {
    if (this.go) {
      var now;

      if (this.countdown) {
        now = this.duration_ms - (Date.now() - this.start_time);
      } else {
        now = (Date.now() - this.start_time);
      }

      return now;
    }

    return this.final_time;
  };
  
  /**
   * Format milliseconds as a string.
   */
  function msToTime(ms) {
    if (ms <= 0) {
      return "00:00.000";
    }

    var milliseconds = (ms % 1000).toString(),
        seconds = Math.floor((ms / 1000) % 60).toString(),
        minutes = Math.floor((ms / (60 * 1000)) % 60).toString();

    if (milliseconds.length === 1) {
      milliseconds = '00' + milliseconds;
    } else if (milliseconds.length === 2) {
      milliseconds = '0' + milliseconds;
    }
    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    return minutes + ":" + seconds + "." + milliseconds;
  };
  
  /**
   * Convert a time string to milliseconds
   * Todo: handle this a bit better
   *
   * Possible inputs:
   * MM:SS
   * MM:SS:ms
   * yyyy-mm-dd HH:MM:SS.ms
   */
  function timeToMS(time) {
    var ms = new Date(time).getTime();

    if (!ms) {
      var time_split = time.split(':'),
          ms;

      ms = parseInt(time_split[0], 10) * 60000;

      if (time_split.length > 1) {
        ms += parseInt(time_split[1], 10) * 1000;
      }

      if (time_split.length > 2) {
        ms += parseInt(time_split[2], 10);
      }
    }

    return ms;
  };

  /**
   * Called by Tock internally - use start() instead
   */
  function _startCountdown(duration) {
    this.duration_ms = duration;
    this.start_time = Date.now();
    this.end_time = this.start_time + this.duration;
    this.time = 0;
    this.elapsed = '0.0';
    this.go = true;
    var t = this;
    this.timeout = window.setTimeout(function () { t._tick(); }, 100);
  };

  /**
   * Called by Tock internally - use start() instead
   */
  function _startTimer() {
    this.start_time = Date.now();
    this.time = 0;
    this.elapsed = '0.0';
    this.go = true;
    var t = this;
    this.timeout = window.setTimeout(function () { t._tick(); }, 100);
  };
  
  return [
    start, 
    stop,
    reset,
    lap,
    msToTime,
    timeToMs
  ];
})();
