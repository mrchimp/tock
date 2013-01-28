/**
 * Tock by Mr Chimp - github.com/mrchimp
 * Based on code by James Edwards:
 *    sitepoint.com/creating-accurate-timers-in-javascript/
 */

function Tock(options) {
  this.interval = options.interval || 100;
  if (options.callback != undefined) {
    this.callback = options.callback;
  }
  this.go = false;
}

Tock.prototype.tick = function() {
  this.time += this.interval;
  this.elapsed = Math.floor(this.time / this.interval) / 10;
  if(Math.round(this.elapsed) == this.elapsed) { this.elapsed += '.0'; }
  var diff = (Date.now() - this.start_time) - this.time;
  var t = this;
  if (this.callback != undefined) {
    this.callback(this);
  }
  if (this.go) {
    this.timeout = setTimeout(function () { t.tick(); }, (this.interval - diff));
  }
}

Tock.prototype.reset = function () {
  this.start_time = Date.now();
  this.time = 0;
  this.elapsed = '0.0';
}

Tock.prototype.start = function() {
  this.start_time = Date.now();
  this.time = 0;
  this.elapsed = '0.0';
  this.go = true;
  var t = this;
  this.timeout = setTimeout(function () { t.tick(); }, 100);
}

Tock.prototype.stop = function() {
  this.go = false;
  final_time = 6;
}

Tock.prototype.lap = function() {
  return (Date.now() - this.start_time);
}

Tock.prototype.msToTime = function(ms) {
  var milliseconds = ms % 1000,
      seconds = Math.floor((ms / 1000) % 60),
      minutes = Math.floor((ms / (60 * 1000)) % 60);

  return minutes + ":" + seconds + "." + milliseconds;
}
