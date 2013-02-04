# Tock #

A javscript timer/countdown clock. 

Based on code by James Edwards:
http://sitepoint.com/creating-accurate-timers-in-javascript/

## Features ##

* Constantly corrects time based on the system clock - won't go out of time.
* Can be used to count up from 0:00 or down from a given time. 
* Can call a callback function every tick (10 milliseconds) and (for countdown clocks) when the clock reaches 0:00.
* Pretty much accurate to about 10 milliseconds (0.01 seconds). 

## How does it work? ##

#### Make some html to show the clock. ####

      <button id="start">Start</button> 
      <button id="stop">Stop</button> 
      <input id="clock" value="10:00">

#### Instantiate a Tock ####

Now in our javascript we make a new instance of Tock and assign it to a variable called *timer*. We'll pass in some options as an object literal while we're at it. *All options are...optional.*

    var timer = new Tock({
        countdown: true,
        interval: 10,
        callback: someCallbackFunction,
        complete: someCompleteFunction
    });

* If *countdown* is true clock will count down from a given time, otherwise it will count up from 0:00. Default: false.

* *interval* is how often, in milliseconds, that the clock will tick. Default: 10.

* *callback* is called every time the clock ticks, once per *interval*. Default: null;

* *complete* is called once the clock reaches 0:00. (only used if countdown = true). Default: null.

#### Control your clock ####

Now you'll need some way of controlling your clock. Let's set up some buttons *(using jQuery)*.

    // Add a start button.
    $('#start').on('click', function() {
	    timer.start($('#clock').val());
	});

Note that we get the time from the clock input and pass it to the start function as the start time.

    // Add a stop button.
    $('#stop').on('click', function() {
	    timer.stop();
	});


#### Add some callback functions ####

Let's replace "someCallbackFunction" above with an anonymous function. Here we use the *lap()* method to get the current clock time in milliseconds, pass that through *msToTime()* to format it nicely and then insert it into the text input we made earlier.

    callback: function () {
        $('#clock').val(timer.msToTime(timer.lap()));
    }

As we are have set *countdown* to *true* we can also replace "someCompleteFunction" with an anonymous function.

    complete: function () {
        alert("Time's up!");
    } 

## Options ##

 * countdown, *bool*
 * interval, *int*
 * callback, *function*
 * complete, *function*

## Methods ##

 * reset()
 * start(time)
 * stop()
 * lap()
 * msToTime(ms)
