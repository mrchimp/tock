# Tock #

A javscript timer/countdown clock. 

Demo: http://deviouschimp.co.uk/misc/tock

Based on an idea by James Edwards:
http://sitepoint.com/creating-accurate-timers-in-javascript/

Status: Working

Todo: 
 * Add timed events.
 * Improve msToTime() implementation

# What's so good about it? #

* Pure Javascript - no dependencies
* Self-correcting time based on the system clock - won't go out of time unlike clocks based solely on setInterval or setTimeout (see the link above).
* It can be used to count up from 0:00 or down from a given time. 
* It can call a callback function every tick (10 milliseconds) and (for countdown clocks) when the clock reaches 0:00.
* It's about as accurate a clock as you can get with Javascript.

# When would I use it? #

 * Countdown counters, e.g. "site will launch in..."
 * Timers
 * Accurate timing of any repeated action

# How do I use it? #

Tock.js works behind the scenes - it doesn't alter anything on screen - so here I'll show how to make a stop-watch that updates in real-time on screen.

### 1) Make some html to show the clock. ###

      <button id="start">Start</button> 
      <button id="stop">Stop</button> 
      <input id="clock" value="10:00">
      <script> // javascripts... </script>

### 2) Instantiate a Tock ###

Now we write some Javascript. First we'll create a new instance of Tock and assign it to a variable called *timer*.

    var timer = new Tock();

This will give you a clock that will count up from 00:00 when the start() method is called. The stop() and reset() methods can also be used.

For more control we can pass in some options. *Note that all options are... optional.*

    var options = {
        countdown: true,
        interval: 10,
        callback: someCallbackFunction,
        complete: someCompleteFunction
    }
    var timer = new Tock(options);


#### Options ####

  * **countdown** *boolean*  Default: false. If true, the clock will count down from a given time, otherwise it will count up from 0:00.
  * **interval** *integer* Default: 10. How often, in milliseconds, that the clock will tick.
  * **callback** *function* Default: null (see below)
  * **complete** *function* Default: null (see below)

#### Callback functions ####

The callback option is a function that will be called once every *interval* milliseconds.

Here we'll use the *lap()* method to get the current clock time (in milliseconds). We'll then pass that through *msToTime()* to format it nicely before displaying it in the *input* field.

    callback: function () {
        var current_time = timer.msToTime(timer.lap());
        $('#clock').val(current_time);
    }

As we are have set *countdown* to *true* we can also pass in a function to call once the countdown reaches zero.

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

You could also create a reset button if you *are* using a countdown clock, but that's beyond the scope of this walkthrough. The tools are there. Do with them what you can. After this next section you're on your own. Good luck. We're all counting on you.

# Methods #

 * reset()
 * start(time)
   * *time* is only needed if using countdown clock.
      Should be an integer in milliseconds.
 * stop()
 * lap()
 * msToTime(ms)
   * Note: this is rudimentary - won't handle > 1 hour
 * timeToMS(time)
   * Time should be a string of form:
   * "MM:SS"
   * "MM:SS:ms"
   * "yyyy-mm-dd HH:MM:SS.ms"
