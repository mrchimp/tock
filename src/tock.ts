/**
 * Tock by Mr Chimp - github.com/mrchimp/tock
 * Based on code by James Edwards:
 *    sitepoint.com/creating-accurate-timers-in-javascript/
 */

import { TockOptions } from "./types/TockOptions";

const MILLISECONDS_RE = /^\s*(\+|-)?\d+\s*$/;
const MM_SS_RE = /^(\d{1,2}):(\d{2})$/;
const MM_SS_ms_OR_HH_MM_SS_RE = /^(\d{1,2}):(\d{2})(?::|\.)(\d{2,3})$/;
const MS_PER_HOUR = 3600000;
const MS_PER_MIN = 60000;
const MS_PER_SEC = 1000;

/* The RegExp below will match a date in format `yyyy-mm-dd HH:MM:SS` and optionally with `.ms` at the end.
 * It will also match ISO date string, i.e. if the whitespace separator in the middle is replaced with a `T`
 * and the date string is also suffixed with a `Z` denoting UTC timezone.
 */
const yyyy_mm_dd_HH_MM_SS_ms_RE =
  /^(\d{4})-([0-1]\d)-([0-3]\d)(?:\s|T)(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3})Z?)?$/;

export default class {
  go: boolean;
  timeout: number | undefined;
  missed_ticks: null | number;
  interval: number;
  countdown: boolean;
  start_time: number;
  pause_time: number;
  final_time: number;
  duration_ms: number;
  time: number;
  callback: (self: this) => void;
  complete: (eslf: this) => void;

  constructor(options: TockOptions = {}) {
    this.go = false;
    this.timeout = undefined;
    this.missed_ticks = null;
    this.interval = options.interval || 10;
    this.countdown = options.countdown || false;
    this.start_time = 0;
    this.pause_time = 0;
    this.final_time = 0;
    this.duration_ms = 0;
    this.time = 0;
    this.callback = options.callback || function () {};
    this.complete = options.complete || function () {};
  }

  /**
   * Called every tick for countdown clocks.
   * i.e. once every this.interval ms
   */
  #tick() {
    this.time += this.interval;

    if (this.countdown && this.duration_ms - this.time < 0) {
      this.final_time = 0;
      this.go = false;
      this.callback(this);
      clearTimeout(this.timeout);
      this.complete(this);
      return;
    } else {
      this.callback(this);
    }

    var diff = Date.now() - this.start_time - this.time,
      next_interval_in = diff > 0 ? this.interval - diff : this.interval;

    if (next_interval_in <= 0) {
      this.missed_ticks = Math.floor(
        Math.abs(next_interval_in) / this.interval
      );
      this.time += this.missed_ticks * this.interval;

      if (this.go) {
        this.#tick.call(this);
      }
    } else if (this.go) {
      this.timeout = setTimeout(this.#tick.bind(this), next_interval_in);
    }
  }

  /**
   * Called by Tock internally - use start() instead
   */
  #startCountdown(duration: number) {
    this.duration_ms = duration;
    this.start_time = Date.now();
    this.time = 0;
    this.go = true;
    this.#tick.call(this);
  }

  /**
   * Called by Tock internally - use start() instead
   */
  #startTimer(start_offset: number) {
    this.start_time = start_offset || Date.now();
    this.time = 0;
    this.go = true;
    this.#tick.call(this);
  }

  /**
   * Reset the clock
   */
  reset() {
    if (this.countdown) {
      return false;
    }

    this.stop();
    this.start_time = 0;
    this.time = 0;
  }

  /**
   * Start the clock.
   * @param {Various} time Accepts a single "time" argument
   *   which can be in various forms:
   *   - MM:SS
   *   - MM:SS:ms or MM:SS.ms
   *   - HH:MM:SS
   *   - yyyy-mm-dd HH:MM:SS.ms
   *   - milliseconds
   */
  start(time: string = "0") {
    if (this.go) {
      return false;
    }

    const time_int = this.timeToMS(time);

    this.start_time = time_int;
    this.pause_time = 0;

    if (this.countdown) {
      this.#startCountdown.call(this, time_int);
    } else {
      this.#startTimer.call(this, Date.now() - time_int);
    }
  }

  /**
   * Stop the clock and clear the timeout
   */
  stop() {
    this.pause_time = this.lap();
    this.go = false;

    clearTimeout(this.timeout);

    if (this.countdown) {
      this.final_time = this.duration_ms - this.time;
    } else {
      this.final_time = Date.now() - this.start_time;
    }
  }

  /**
   * Stop/start the clock.
   */
  pause() {
    if (this.go) {
      this.pause_time = this.lap();
      this.stop();
    } else {
      if (this.pause_time) {
        if (this.countdown) {
          this.#startCountdown.call(this, this.pause_time);
        } else {
          this.#startTimer.call(this, Date.now() - this.pause_time);
        }

        this.pause_time = 0;
      }
    }
  }

  /**
   * Get the current clock time in ms.
   * Use with Tock.msToTime() to make it look nice.
   */
  lap() {
    if (this.go) {
      var now;

      if (this.countdown) {
        now = this.duration_ms - (Date.now() - this.start_time);
      } else {
        now = Date.now() - this.start_time;
      }

      return now;
    }

    return this.pause_time || this.final_time;
  }

  /**
   * Format milliseconds as a MM:SS.ms string.
   */
  msToTime(ms: number): string {
    var milliseconds = this.zeroPad(ms % MS_PER_SEC, 3),
      seconds = this.zeroPad(Math.floor((ms / MS_PER_SEC) % 60), 2),
      minutes = this.zeroPad(Math.floor((ms / MS_PER_MIN) % 60), 2);

    return minutes + ":" + seconds + "." + milliseconds;
  }

  /**
   * Pad the left side of a string with zeros up to a given length. I
   * considered using an NPM package for this but it's probably best not to.
   */
  zeroPad(input: number | string, length: number): string {
    input = input.toString();

    while (input.length < length) {
      input = "0" + input;
    }

    return input;
  }

  /**
   * Format milliseconds as HH:MM:SS or HH:MM:SS:mmm
   */
  msToTimecode(ms: number, show_ms: boolean = false): string {
    var seconds = this.zeroPad(Math.floor((ms / MS_PER_SEC) % 60), 2),
      minutes = this.zeroPad(Math.floor((ms / MS_PER_MIN) % 60), 2),
      hours = this.zeroPad(Math.floor(ms / MS_PER_HOUR), 2),
      millisec = show_ms
        ? ":" + this.zeroPad(Math.floor(ms % MS_PER_SEC), 3)
        : "";

    return hours + ":" + minutes + ":" + seconds + millisec;
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
   */
  timeToMS(time: string): number {
    // If input is milliseconds integer then return it back
    if (MILLISECONDS_RE.test(String(time))) {
      return parseInt(time, 10);
    }

    let ms;
    let time_split;
    let match;
    let date;
    const now = new Date();

    if (MM_SS_RE.test(time)) {
      // If MM:SS
      time_split = time.split(":");
      ms = parseInt(time_split[0], 10) * MS_PER_MIN;
      ms += parseInt(time_split[1], 10) * MS_PER_SEC;
      return ms;
    }

    match = time.match(MM_SS_ms_OR_HH_MM_SS_RE);

    if (match) {
      if (match[3].length == 3 || parseInt(match[3], 10) > 59) {
        // If MM:SS:ms or MM:SS.ms (e.g. 10:10:458 or 10:10.458)
        ms = parseInt(match[1], 10) * MS_PER_MIN;
        ms += parseInt(match[2], 10) * MS_PER_SEC;
        ms += parseInt(match[3], 10);

        return ms;
      } else {
        // Then it's HH:MM:SS
        ms = parseInt(match[1], 10) * MS_PER_HOUR;
        ms += parseInt(match[2], 10) * MS_PER_MIN;
        ms += parseInt(match[3], 10) * MS_PER_SEC;

        return ms;
      }
    }

    match = time.match(yyyy_mm_dd_HH_MM_SS_ms_RE);

    if (match) {
      // If yyyy-mm-dd HH:MM:SS or yyyy-mm-dd HH:MM:SS.ms or yyyy-mm-ddTHH:MM:SS.msZ
      date = new Date();
      date.setFullYear(parseInt(match[1], 10));
      date.setMonth(parseInt(match[2], 10));
      date.setDate(parseInt(match[3], 10));
      date.setHours(parseInt(match[4], 10));
      date.setMinutes(parseInt(match[5], 10));
      date.setSeconds(parseInt(match[6], 10));

      if (typeof match[7] !== "undefined") {
        date.setMilliseconds(parseInt(match[7], 10));
      }

      ms = Math.max(0, date.getTime() - now.getTime());
      return ms;
    }

    // Let's try it as a date string
    ms = Date.parse(time);

    if (!isNaN(ms)) {
      // Looks ok
      return Math.max(0, ms - now.getTime());
    }

    // Could not recognize input, so start from 0
    return 0;
  }
}
