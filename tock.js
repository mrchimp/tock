/**
 * Tock by Mr Chimp - github.com/mrchimp
 * Based on code by James Edwards:
 *    sitepoint.com/creating-accurate-timers-in-javascript/
 */

function Tock(options) {
  this.interval = options.interval || 10;//you probably dont want to change this
  this.type = options.type || 'timer';
  if (options.callback != undefined) {
    this.callback = options.callback;
  } else {
    this.callback = function () {};
  }
  this.go = false;
  this.countdown_start = 0;
}

Tock.prototype.tick = function() {
  // indecrement the clock
  this.time += this.interval;
  
  // get _accurate_ number of ticks since start
  // i.e. number of ticks their should have been
  this.elapsed = Math.floor(this.time / this.interval) / 10;
  
  // convert to float if necessary
  if(Math.round(this.elapsed) == this.elapsed) { this.elapsed += '.0'; }
  
  // find the difference between 
  var diff = (Date.now() - this.start_time) - this.time;
  
  // get the current scope to pass to the timeout
  var t = this;
  
  // run the callback function if there is one
  if (this.callback != undefined) {
    this.callback(this);
  }
  
  // if we're still counting, keep ticking
  if (this.go) {
    this.timeout = setTimeout(function () {t.tick();}, (this.interval - diff));
  }
};

Tock.prototype.tickDown = function () {
  console.log('tickdown');
  // indecrement the clock
  this.time -= this.interval;
  
  // get _accurate_ number of ticks since start
  // i.e. number of ticks their should have been
  this.elapsed = Math.floor(this.time / this.interval) / 10;
  
  // convert to float if necessary
  if(Math.round(this.elapsed) == this.elapsed) { this.elapsed += '.0'; }
  
  // find the difference between 
  var diff = (Date.now() - this.start_time) - this.time;
  
  // get the current scope to pass to the timeout
  var t = this;
  
  // run the callback function if there is one
  if (this.callback != undefined) {
    this.callback(this);
  }
  
  // if we're still counting, keep ticking
  if (this.go) {
    this.timeout = setTimeout(function () {t.tickDown();}, (this.interval - diff));
  }
};

// Reset the clock
Tock.prototype.reset = function () {
  this.stop();
  this.start_time = 0;
  this.time = 0;
  this.elapsed = '0.0';
};

// Called internally - use start() instead
Tock.prototype._startCountdown = function (start) {  
  
  var time_split = start.split(':');
  var duration_ms = start[0] * 1000;
  
  if (start.length) {
    duration_ms += start[1] * 60000;
  }

  console.log(duration_ms);
  this.start_time = Date.now();
  this.end_time = this.start_time + start;
  this.time = 0;
  this.elapsed = '0.0';
  this.go = true;
  
  var t = this;
  
  this.timeout = setTimeout(function () { t.tickDown(); }, 100);
};

// Called internally - use start() instead
Tock.prototype._startTimer = function () {
  this.start_time = Date.now();
  this.time = 0;
  this.elapsed = '0.0';
  this.go = true;
  
  var t = this;
  
  this.timeout = setTimeout(function () { t.tick(); }, 100);
};

// Start the clock
Tock.prototype.start = function(start) {
  if (this.type == 'countdown') {
    this._startCountdown(start);
  } else {
    this._startTimer();
  }
};

// Stop the clock
Tock.prototype.stop = function() {
  this.go = false;
  this.final_time = (Date.now() - this.start_time);
  clearTimeout(this.timeout);
};

// Get the current time
Tock.prototype.lap = function() {
  var now = (Date.now() - this.start_time);
  
  if (this.go) {
    return now;
  }
  
  if (this.final_time != undefined) {
    return this.final_time;
  } else {
    return '';
  }
};

// Format milliseconds as a string
Tock.prototype.msToTime = function(ms) {
  var milliseconds = ms % 1000,
      seconds = Math.floor((ms / 1000) % 60).toString(),
      minutes = Math.floor((ms / (60 * 1000)) % 60).toString();
  
  if (seconds.length == 1) { seconds = '0' + seconds }
  if (minutes.length == 1) { minutes = '0' + minutes }
  
  return minutes + ":" + seconds + ":" + milliseconds;
};
