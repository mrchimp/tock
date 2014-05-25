/**
* Tock by Mr Chimp - github.com/mrchimp/tock
* Based on code by James Edwards:
*    sitepoint.com/creating-accurate-timers-in-javascript/
*/
var Tock = (function(options) {

  Tock.instances = (Tock.instances || 0) + 1;

  var go          = false,
      interval    = options.interval || 10,
      countdown   = options.countdown || false,
      start_time  = 0,
      pause_time  = 0,
      final_time  = 0,
      duration_ms = 0,
      time        = 0,
      elapsed     = 0,
      callback    = options.callback,
      complete    = options.complete,
      prefix      = "Tock" + Tock.instances;

  /**
   * Reset the clock
   */
  function reset() {
    if (countdown) {
      return false;
    }
    stop();
    start_time = 0;
    time = 0;
    elapsed = '0.0';
  }

  /**
   * Start the clock.
   */
  function start(time) {
    start_time = time;

    if (countdown) {
      _startCountdown(time);
    } else {
      _startTimer(0);
    }
  }
  
  /**
   * Called every tick for countdown clocks.
   * i.e. once every this.interval ms
   */
  function _tick() {
    time += interval;
    elapsed = Math.floor(time / interval) / 10;

    if (Math.round(elapsed) === elapsed) { elapsed += '.0'; }

    var t = this,
        diff = (Date.now() - start_time) - time,
        next_interval_in = interval - diff;

    if (callback !== undefined) {
      callback(this);
    }

    if (countdown && (duration_ms - time < 0)) {
      final_time = 0;
      go = false;
      complete();
    }

    if (next_interval_in <= 0) {
      missed_ticks = Math.floor(Math.abs(next_interval_in) / interval);
      time += missed_ticks * interval;

      if (go) {
        _tick();
      }
    } else {
      if (go) {
        timeout = window.setTimeout(_tick, next_interval_in);
        timeout = prefix + timeout;
      }
    }
  }

  /**
   * Stop the clock.
   */
  function stop() {
    go = false;

    window.clearTimeout(timeout.replace(prefix));

    if (countdown) {
      final_time = duration_ms - time;
    } else {
      final_time = (Date.now() - start_time);
    }
  }

  /**
   * Stop/start the clock.
   */
  function pause() {
    if (go) {
      pause_time = lap();
      stop();
    } else {
      if (pause_time) {
        if (countdown) {
          _startCountdown(pause_time);
        } else {
          _startTimer(pause_time);
        }
      }
    }
  }
  
  /**
   * Get the current clock time in ms.
   * Use with Tock.msToTime() to make it look nice.
   */
  function lap() {
    if (go) {
      var now;

      if (countdown) {
        now = duration_ms - (Date.now() - start_time);
      } else {
        now = (Date.now() - start_time);
      }

      return now;
    }

    return pause_time || final_time;
  }
  
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
  }
  
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
      var time_split = time.split(':');

      ms = parseInt(time_split[0], 10) * 60000;

      if (time_split.length > 1) {
        ms += parseInt(time_split[1], 10) * 1000;
      }

      if (time_split.length > 2) {
        ms += parseInt(time_split[2], 10);
      }
    }

    return ms;
  }

  /**
   * Called by Tock internally - use start() instead
   */
  function _startCountdown(duration) {
    duration_ms = duration;
    start_time = Date.now();
    end_time = start_time + duration_ms;
    time = 0;
    elapsed = '0.0';
    go = true;
    _tick();
    this.timeout = window.setTimeout(_tick, interval);
  }

  /**
   * Called by Tock internally - use start() instead
   */
  function _startTimer(start_offset) {
    start_time = Date.now() - start_offset;
    time = 0;
    elapsed = '0.0';
    go = true;
    _tick();
    this.timeout = window.setTimeout(_tick, interval);
  }
  
  return {
    start: start,
    pause: pause,
    stop: stop,
    reset: reset,
    lap: lap,
    msToTime: msToTime,
    timeToMS: timeToMS
  };
});
