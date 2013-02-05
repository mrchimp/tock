# Tock #

A javscript timer/countdown clock. 

Demo: http://deviouschimp.co.uk/misc/tock

Based on code by James Edwards:
http://sitepoint.com/creating-accurate-timers-in-javascript/

## Features ##

* Self-correcting time based on the system clock - won't go out of time unlike clocks based solely on setInterval or setTimeout.
* Can be used to count up from 0:00 or down from a given time. 
* Can call a callback function every tick (10 milliseconds) and (for countdown clocks) when the clock reaches 0:00.
* About as accurate a clock as you can get with javascript.

## Possible Uses ##

 * Accurate timing of repeated actions
 * Countdown counters, e.g. for site launches
 * Accurate stopwatches/timers

## How does it work? ##

#### Make some html to show the clock. ####

      <button id="start">Start</button> 
      <button id="stop">Stop</button> 
      <input id="clock" value="10:00">

#### Instantiate a Tock ####

In javascript we make a new instance of Tock and assign it to a variable called *timer*. We'll pass in some options as an object literal while we're at it. *All options are... optional.*

    var timer = new Tock({
        countdown: true,
        interval: 10,
        callback: someCallbackFunction,
        complete: someCompleteFunction
    });

#### Options ####

  * **countdown** *boolean* If true, the clock will count down from a given time, otherwise it will count up from 0:00. Default: false.

  * **interval** *integer* How often, in milliseconds, that the clock will tick. Default: 10.

  * **callback** *function* Called every time the clock ticks, once per *interval*. Default: null;

  * **complete** *function* Called once the clock reaches 0:00. (only used if countdown = true). Default: null.

#### Add some controls ####

Now you'll need some way of controlling your clock. Let's set up some buttons *(using jQuery)*.

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


#### Add some callback functions ####

*someCallbackFunction* in the code above is a function to call once every *interval* milliseconds. Below, we use the *lap()* method to get the current clock time (in milliseconds). We then pass that through *msToTime()* to format it nicely and then display it into the input field.

    callback: function () {
        $('#clock').val(timer.msToTime(timer.lap()));
    }

As we are have set *countdown* to *true* we can also replace *someCompleteFunction* with a function to call once the countdown reaches zero.

    complete: function () {
        alert("Time's up!");
    }

## Methods ##

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