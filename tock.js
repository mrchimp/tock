/**
* Tock by Mr Chimp - github.com/mrchimp/tock
* Based on code by James Edwards:
*    sitepoint.com/creating-accurate-timers-in-javascript/
*/

// Implements Date.now() for ie lt 9
Date.now = Date.now || function() { return +new Date(); };

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Tock = factory();
  }
}(this, function () {

  var Tock = (function(options) {

    Tock.instances = (Tock.instances || 0) + 1;

    var go           = false,
        timeout      = null,
        missed_ticks = null,
        interval     = options.interval || 10,
        countdown    = options.countdown || false,
        start_time   = 0,
        pause_time   = 0,
        offset_time  = 0,
        final_time   = 0,
        duration_ms  = 0,
        time         = 0,
        elapsed      = 0,
        callback     = options.callback || function(){},
        complete     = options.complete || function(){};

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
     * accepts a single "time" argument which can be in various forms:
     ** MM:SS
     ** MM:SS:ms or MM:SS.ms
     ** HH:MM:SS
     ** yyyy-mm-dd HH:MM:SS.ms
     */

    function start(time) {
      time = time || 0;
      
      if(time) {
        time = timeToMS(time);
      }

      start_time = time;

      if (countdown) {
        _startCountdown(time);
      } else {
        _startTimer(Date.now() - time);
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
          next_interval_in = interval - diff + offset_time;
          
      offset_time = 0;

      if (callback !== undefined) {
        callback(this);
      }

      if (countdown && (duration_ms - time < 0)) {
        final_time = 0;
        go = false;
        callback();
        window.clearTimeout(this.timeout);
        complete();
        return;
      }

      if (next_interval_in <= 0) {
        this.missed_ticks = Math.floor(Math.abs(next_interval_in) / interval);
        time += this.missed_ticks * interval;

        if (go) {
          _tick();
        }
      } else {
        if (go) {
          this.timeout = window.setTimeout(_tick, next_interval_in);
        }
      }
    }

    /**
     * Stop the clock.
     */
    function stop() {
      pause_time = lap();
      go = false;
      
      window.clearTimeout(this.timeout);

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
            _startTimer(Date.now() - pause_time);
          }
        }
      }
    }
    
    /**
     * Add offset to next tick of clock
     * may be negative or positive
     */
    function offset(ms) {
      offset_time += ms;
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
     * Format milliseconds as a MM:SS.ms string.
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
     * Format milliseconds as HH:MM:SS
     */
    function msToTimecode(ms) {
      if (ms <= 0) {
        return "00:00:00";
      }

      var milliseconds = (ms % 1000).toString(),
          seconds = Math.floor((ms / 1000) % 60).toString(),
          minutes = Math.floor((ms / (60 * 1000)) % 60).toString(),
          hours = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();

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
      if (hours.length === 1 ) {
        hours = '0' + hours;
      }
      return hours + ":" + minutes + ":" + seconds;
    }

    /**
     * Convert a time string to milliseconds
     *
     * Possible inputs:
     * MM:SS
     * MM:SS:ms or MM:SS.ms
     * HH:MM:SS
     * yyyy-mm-dd HH:MM:SS.ms
     *
     * A milliseconds input will return it back for safety
     * If the input cannot be recognized then 0 is returned
     *
     */
    function timeToMS(time) {
      
      //if milliseconds integer is input then return it back
      if(String(time).search (/^\s*(\+|-)?\d+\s*$/) != -1) {
        return time;
      }
      
      var time_split = time.split(':'); 

      if(time.match(/^([0-9][0-9]):([0-9][0-9])$/)) { //if MM:SS
        ms = parseInt(time_split[0], 10) * 60000;
        ms += parseInt(time_split[1], 10) * 1000;
      }
      else if(time.match(/^([0-9][0-9]):([0-9][0-9]):([0-9][0-9][0-9])$/)) { //if MM:SS:ms (e.g. 10:10:458)
        ms = parseInt(time_split[0], 10) * 60000;
        ms += parseInt(time_split[1], 10) * 1000;
        ms += parseInt(time_split[2], 10);
      }
      else if(time.match(/^([0-9][0-9]):([0-9][0-9])\.([0-9][0-9][0-9])$/)) { //if MM:SS.ms (e.g. 10:10.458)
        ms = parseInt(time_split[0], 10) * 60000;
        minute_ms_split = time_split[1].split('.');
        ms += parseInt(minute_ms_split[0], 10) * 1000;
        ms += parseInt(minute_ms_split[1], 10);
      }
      else if(time.match(/^([0-9][0-9]):([0-9][0-9]):([0-9][0-9])$/)) { //if HH:MM:SS
        ms = parseInt(time_split[0], 10) * 1000 * 60 * 60;
        ms += parseInt(time_split[1], 10) * 1000 * 60;
        ms += parseInt(time_split[2], 10) * 1000;
      }
      else if(time.match(/^([0-9][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9]) ([0-9][0-9]):([0-9][0-9]):([0-9][0-9])$/)){ //if yyyy-mm-dd HH:MM:SS.ms
        ms = new Date(time).getTime();
      }
      else { //could not recognize input, so start from 0
        ms = 0;
      }

      return ms;
    }

    /**
     * Called by Tock internally - use start() instead
     */
    function _startCountdown(duration) {
      duration_ms = duration;
      start_time = Date.now();
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
      start_time = start_offset || Date.now();
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
      msToTimecode: msToTimecode,
      timeToMS: timeToMS
    };
  });

  return Tock;
}));
