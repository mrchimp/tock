# Tock #

A javscript timer/countdown clock.

[View Demo](https://mrchimp.github.io/tock-demo/)

Based on an idea by James Edwards:
http://sitepoint.com/creating-accurate-timers-in-javascript/

# Version 2 Changes

- Rewrite Tock as an ES6 module using TypeScript
- Move distribution files to `/dist`
- Replace setYear with setFullYear in timeToMs
- Remove polyfills

# Readme Contents #

 * [What's so good about it?](#whats-so-good-about-it)
 * [When would I use it?](#when-would-i-use-it)
 * [How do I get it?](#how-do-i-get-it)
 * [How do I use it?](#how-do-i-use-it)
 * [Options](#options)
 * [Callbacks](#callbacks)
 * [Methods](#methods)
 * [License](#license)


# What's so good about it? #

* Pure Javascript - no dependencies
* Self-correcting time based on the system clock - won't go out of time unlike clocks based solely on setInterval or setTimeout (see the link above).
* It can be used to count up from any arbitrary time (or 0:00) or countdown from a given time.
* It can call a callback function every tick (10 milliseconds) and (for countdown clocks) when the clock reaches 0:00.
* It's about as accurate a clock as you can get with Javascript.


# When would I use it? #

 * Countdown counters, e.g. "site will launch in..."
 * Timers
 * Accurate timing of any repeated action


# How do I get it? #

You probably use a dependency manager, such as NPM:

```bash
npm install tocktimer
```

or Yarn

```bash
yarn add tocktimer
```


# How do I use it? #

Tock.js works behind the scenes - it doesn't alter anything on screen - so here I'll show how to make a stop-watch that updates in real-time on screen.

### 1) Make some html to show the clock. ###

```html
<button id="start">Start</button>
<button id="stop">Stop</button>
<input id="clock" value="10:00">
<script>
 //
</script>
```

### 2) Instantiate a Tock ###

First create a new instance of Tock and assign it to a variable called *timer*.

```js
const timer = new Tock();
```

This will give you a clock that will count up from 00:00 when the start() method is called. The stop() and reset() methods can also be used.

For more control we can pass in some options. *Note that all options are...optional.*

```js
const timer = new Tock({
  countdown: true,
  interval: 10,
  callback: someCallbackFunction,
  complete: someCompleteFunction
});
```

### 2) Add some controls ###

You'll need some way of controlling your clock. Let's set add a start button. Note that we get the time from the clock input and pass it to the start function as the start time.


```js
document.getElementById('start').addEventListener('click', () => {
  timer.start(document.getElementById('clock').value);
});
```

Now add a stop button

```js
document.getElementById('stop').addEventListener('click', () => {
  timer.stop();
});
```

If you're not using a countdown clock you can make a reset button, too.

```js
document.getElementById('reset').addEventListener('click', () => {
  timer.reset();
});
```

You could also create a reset button if you *are* using a countdown clock, but that's beyond the scope of this walkthrough. The tools are there. Do with them what you can. After this next section you're on your own. Good luck. We're all counting on you.


# Options #

  * **countdown** *boolean*  Default: false. If true, the clock will count down from a given time, otherwise it will count up from 0:00.
  * **interval** *integer* Default: 10. How often, in milliseconds, that the clock will tick.
  * **callback** *function* Default: null (see below)
  * **complete** *function* Default: null (see below)


## Callbacks ##

The callback option is a function that will be called once every `interval` milliseconds.

Here we'll use the `lap()` method to get the current clock time (in milliseconds). We'll then pass that through `msToTime()` to format it nicely before displaying it in the `input` field.

```js
callback: () => {
  var current_time = timer.msToTime(timer.lap());
  document.getElementById('clock').value = current_time;
},
```

If `countdown` is `true` you can also pass in a function to call once the countdown reaches zero.

```js
complete: () => {
  alert("Time's up!");
},
```

# Methods #

 * **start(time)** - Start the timer
   * `time` (optional) can be either a countdown value or a starting value.

     If a `countdown` is `true` then set `time` to count down from.

     If a `countdown` is `false` or not `time` will control start time to count up from.

     Both timer types allow `time` as an integer number of milliseconds or as as string - see `timeToMS` below.
 * **stop()** - Stop the clock and clear the timeout
 * **pause()** - Stop the clock if it's running, continue clock if paused
 * **reset()** - Reset times to zero
   * Note: Countdown clocks need a duration to be passed to `start()` after `reset()` is called.
 * **lap()** - Return elapsed time in milliseconds

### Conversion ###

 > *Note: Tock is designed to work with millisecond values. These conversion methods are provided as basic helpers and may be removed entirely in later versions. If you want more complex or custom formatting, you might want to use [date-fns](https://date-fns.org//).*

 * **msToTime(ms)** - Convert number of milliseconds to a `MM:SS` time string
   * Won't handle times greater than 1 hour
 * **msToTimecode(ms, show_ms)** - Convert number of milliseconds to timecode string
   * `ms` - number of milliseconds
   * `show_ms` - Optional. If true, return an `HH:MM:SS:mmm` format otherwise `HH:MM:SS`
 * **timeToMS(time)** - Convert a time string to a number of milliseconds
   * `string` - should be a duration as a string of form:
     * `MM:SS`
     * `MM:SS:ms`
     * `MM:SS.ms`
     * `HH:MM:SS`
   * Alternatively a time in the future can be provided using the form `yyyy-mm-dd HH:MM:SS.ms`. The difference between
   this time and present will be returned.
   * If the input cannot be recognized as one of the above then `0` is returned


# Development #

I'm using [Grunt](http://gruntjs.com/) for task running and [Mocha](http://mochajs.org/) for testing.

Get all dependencies with:

```bash
npm install
```

Run all tasks:

```bash
npm run build
```

# Testing

Run tests

```bash
npm run test
```

Run a server and open the test/demo html file

```bash
npm run serve
```

# License #

MIT License.
