# Tock #

A javscript timer/countdown clock. 

Demo: http://deviouschimp.co.uk/misc/tock

Based on code by James Edwards:
http://sitepoint.com/creating-accurate-timers-in-javascript/

# Features #

* Self-correcting time based on the system clock - won't go out of time unlike clocks based solely on setInterval or setTimeout.
* Can be used to count up from 0:00 or down from a given time. 
* Can call a callback function every tick (10 milliseconds) and (for countdown clocks) when the clock reaches 0:00.
* About as accurate a clock as you can get with javascript.

# Possible Uses #

 * Countdown counters, e.g. for site launches
 * Accurate stopwatches/timers
 * Accurate timing of any repeated actions

# How does it work? #

Tock can be used behind the scenes but here we'll make a stop-watch that updates in realtime on screen.

### 1) Make some html to show the clock. ###

      <button id="start">Start</button> 
      <button id="stop">Stop</button> 
      <input id="clock" value="10:00">
      <script> // javascripts... </script>

### 2) Instantiate a Tock ###

Next we make a new instance of Tock in our javascript code and assign it to a variable called *timer*.

    var timer = new Tock();

This will give you a clock that will count up from 00:00 when the start() method is called. The stop() and reset() methods can also be used.

It's more intersting if you pass in some options though. *Note that all options are... optional.*

    var options = {
        countdown: true,
        interval: 10,
        callback: someCallbackFunction,
        complete: someCompleteFunction
    }
    var timer = new Tock(options);


#### Available options ####

  * **countdown** *boolean* If true, the clock will count down from a given time, otherwise it will count up from 0:00. Default: false.
  * **interval** *integer* How often, in milliseconds, that the clock will tick. Default: 10.
  * **callback** *function* Default: null (see below)
  * **complete** *function* Default: null (see below)

#### Callback functions ####

The callback option is a function that will be called once every *interval* milliseconds.

Here we'll use the *lap()* method to get the current clock time (in milliseconds). We'll then pass that through *msToTime()* to format it nicely and before displaying it in the input field.

    callback: function () {
        $('#clock').val(timer.msToTime(timer.lap()));
    }

As we are have set *countdown* to *true* we can also replace *someCompleteFunction* with a function to call once the countdown reaches zero.

    complete: function () {
        alert("Time's up!");
    }

### 2) Add some controls ###

You'll need some way of controlling your clock. Let's set up some buttons *(using jQuery for example)*.

    $('#start').on('click', function() {
	    timer.start($('#clock').val());
	});

Note that we get the time from the clock input and pass it to the start function as the start time.

    $('#stop').on('click', function() {
	    timer.stop();
	});

If you're not using a countdown clock you can make a reset button, too.

    $('#reset').on('click', function() {
	    timer.reset();
	});

# Methods #

 * reset()
 * start(time)
   * *time* is only needed if using countdown clock.
      Should be a string of format:
   * "MM:SS"
   * "MM:SS:ms"
   * "yyyy-mm-dd HH:MM:SS.ms"
 * stop()
 * lap()
 * msToTime(ms)
   * Note: this is redimentary - won't handle > 1 hour