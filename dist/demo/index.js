/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

/**
 * Tock by Mr Chimp - github.com/mrchimp/tock
 * Based on code by James Edwards:
 *    sitepoint.com/creating-accurate-timers-in-javascript/
 */
var MILLISECONDS_RE = /^\s*(\+|-)?\d+\s*$/;
var MM_SS_RE = /^(\d{1,2}):(\d{2})$/;
var MM_SS_ms_OR_HH_MM_SS_RE = /^(\d{1,2}):(\d{2})(?::|\.)(\d{2,3})$/;
var MS_PER_HOUR = 3600000;
var MS_PER_MIN = 60000;
var MS_PER_SEC = 1000;
/* The RegExp below will match a date in format `yyyy-mm-dd HH:MM:SS` and optionally with `.ms` at the end.
 * It will also match ISO date string, i.e. if the whitespace separator in the middle is replaced with a `T`
 * and the date string is also suffixed with a `Z` denoting UTC timezone.
 */

var yyyy_mm_dd_HH_MM_SS_ms_RE = /^(\d{4})-([0-1]\d)-([0-3]\d)(?:\s|T)(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3})Z?)?$/;

var _tick = /*#__PURE__*/new WeakSet();

var _startCountdown = /*#__PURE__*/new WeakSet();

var _startTimer = /*#__PURE__*/new WeakSet();

var Tock = /*#__PURE__*/function () {
  function Tock() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tock);

    _classPrivateMethodInitSpec(this, _startTimer);

    _classPrivateMethodInitSpec(this, _startCountdown);

    _classPrivateMethodInitSpec(this, _tick);

    _defineProperty(this, "go", void 0);

    _defineProperty(this, "timeout", void 0);

    _defineProperty(this, "missed_ticks", void 0);

    _defineProperty(this, "interval", void 0);

    _defineProperty(this, "countdown", void 0);

    _defineProperty(this, "start_time", void 0);

    _defineProperty(this, "pause_time", void 0);

    _defineProperty(this, "final_time", void 0);

    _defineProperty(this, "duration_ms", void 0);

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "callback", void 0);

    _defineProperty(this, "complete", void 0);

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


  _createClass(Tock, [{
    key: "reset",
    value:
    /**
     * Reset the clock
     */
    function reset() {
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

  }, {
    key: "start",
    value: function start() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0";

      if (this.go) {
        return false;
      }

      var time_int = this.timeToMS(time);
      this.start_time = time_int;
      this.pause_time = 0;

      if (this.countdown) {
        _classPrivateMethodGet(this, _startCountdown, _startCountdown2).call(this, time_int);
      } else {
        _classPrivateMethodGet(this, _startTimer, _startTimer2).call(this, Date.now() - time_int);
      }
    }
    /**
     * Stop the clock and clear the timeout
     */

  }, {
    key: "stop",
    value: function stop() {
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

  }, {
    key: "pause",
    value: function pause() {
      if (this.go) {
        this.pause_time = this.lap();
        this.stop();
      } else {
        if (this.pause_time) {
          if (this.countdown) {
            _classPrivateMethodGet(this, _startCountdown, _startCountdown2).call(this, this.pause_time);
          } else {
            _classPrivateMethodGet(this, _startTimer, _startTimer2).call(this, Date.now() - this.pause_time);
          }

          this.pause_time = 0;
        }
      }
    }
    /**
     * Get the current clock time in ms.
     * Use with Tock.msToTime() to make it look nice.
     */

  }, {
    key: "lap",
    value: function lap() {
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

  }, {
    key: "msToTime",
    value: function msToTime(ms) {
      var milliseconds = this.zeroPad(ms % MS_PER_SEC, 3),
          seconds = this.zeroPad(Math.floor(ms / MS_PER_SEC % 60), 2),
          minutes = this.zeroPad(Math.floor(ms / MS_PER_MIN % 60), 2);
      return minutes + ":" + seconds + "." + milliseconds;
    }
    /**
     * Pad the left side of a string with zeros up to a given length. I
     * considered using an NPM package for this but it's probably best not to.
     */

  }, {
    key: "zeroPad",
    value: function zeroPad(input, length) {
      input = input.toString();

      while (input.length < length) {
        input = "0" + input;
      }

      return input;
    }
    /**
     * Format milliseconds as HH:MM:SS or HH:MM:SS:mmm
     */

  }, {
    key: "msToTimecode",
    value: function msToTimecode(ms) {
      var show_ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var seconds = this.zeroPad(Math.floor(ms / MS_PER_SEC % 60), 2),
          minutes = this.zeroPad(Math.floor(ms / MS_PER_MIN % 60), 2),
          hours = this.zeroPad(Math.floor(ms / MS_PER_HOUR), 2),
          millisec = show_ms ? ":" + this.zeroPad(Math.floor(ms % MS_PER_SEC), 3) : "";
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

  }, {
    key: "timeToMS",
    value: function timeToMS(time) {
      // If input is milliseconds integer then return it back
      if (MILLISECONDS_RE.test(String(time))) {
        return parseInt(time, 10);
      }

      var ms;
      var time_split;
      var match;
      var date;
      var now = new Date();

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
      } // Let's try it as a date string


      ms = Date.parse(time);

      if (!isNaN(ms)) {
        // Looks ok
        return Math.max(0, ms - now.getTime());
      } // Could not recognize input, so start from 0


      return 0;
    }
  }]);

  return Tock;
}();

function _tick2() {
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
    this.missed_ticks = Math.floor(Math.abs(next_interval_in) / this.interval);
    this.time += this.missed_ticks * this.interval;

    if (this.go) {
      _classPrivateMethodGet(this, _tick, _tick2).call(this);
    }
  } else if (this.go) {
    this.timeout = window.setTimeout(_classPrivateMethodGet(this, _tick, _tick2).bind(this), next_interval_in);
  }
}

function _startCountdown2(duration) {
  this.duration_ms = duration;
  this.start_time = Date.now();
  this.time = 0;
  this.go = true;

  _classPrivateMethodGet(this, _tick, _tick2).call(this);
}

function _startTimer2(start_offset) {
  this.start_time = start_offset || Date.now();
  this.time = 0;
  this.go = true;

  _classPrivateMethodGet(this, _tick, _tick2).call(this);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tock);

/***/ }),

/***/ "./node_modules/chartist/dist/index.js":
/*!*********************************************!*\
  !*** ./node_modules/chartist/dist/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutoScaleAxis": () => (/* binding */ AutoScaleAxis),
/* harmony export */   "Axis": () => (/* binding */ Axis),
/* harmony export */   "BarChart": () => (/* binding */ BarChart),
/* harmony export */   "BaseChart": () => (/* binding */ BaseChart),
/* harmony export */   "EPSILON": () => (/* binding */ EPSILON),
/* harmony export */   "EventEmitter": () => (/* binding */ EventEmitter),
/* harmony export */   "FixedScaleAxis": () => (/* binding */ FixedScaleAxis),
/* harmony export */   "Interpolation": () => (/* binding */ index),
/* harmony export */   "LineChart": () => (/* binding */ LineChart),
/* harmony export */   "PieChart": () => (/* binding */ PieChart),
/* harmony export */   "StepAxis": () => (/* binding */ StepAxis),
/* harmony export */   "Svg": () => (/* binding */ Svg),
/* harmony export */   "SvgList": () => (/* binding */ SvgList),
/* harmony export */   "SvgPath": () => (/* binding */ SvgPath),
/* harmony export */   "alphaNumerate": () => (/* binding */ alphaNumerate),
/* harmony export */   "axisUnits": () => (/* binding */ axisUnits),
/* harmony export */   "createChartRect": () => (/* binding */ createChartRect),
/* harmony export */   "createGrid": () => (/* binding */ createGrid),
/* harmony export */   "createGridBackground": () => (/* binding */ createGridBackground),
/* harmony export */   "createLabel": () => (/* binding */ createLabel),
/* harmony export */   "createSvg": () => (/* binding */ createSvg),
/* harmony export */   "deserialize": () => (/* binding */ deserialize),
/* harmony export */   "determineAnchorPosition": () => (/* binding */ determineAnchorPosition),
/* harmony export */   "easings": () => (/* binding */ easings),
/* harmony export */   "ensureUnit": () => (/* binding */ ensureUnit),
/* harmony export */   "escapingMap": () => (/* binding */ escapingMap),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "getBounds": () => (/* binding */ getBounds),
/* harmony export */   "getHighLow": () => (/* binding */ getHighLow),
/* harmony export */   "getMetaData": () => (/* binding */ getMetaData),
/* harmony export */   "getMultiValue": () => (/* binding */ getMultiValue),
/* harmony export */   "getNumberOrUndefined": () => (/* binding */ getNumberOrUndefined),
/* harmony export */   "getSeriesOption": () => (/* binding */ getSeriesOption),
/* harmony export */   "isArrayOfArrays": () => (/* binding */ isArrayOfArrays),
/* harmony export */   "isArrayOfSeries": () => (/* binding */ isArrayOfSeries),
/* harmony export */   "isDataHoleValue": () => (/* binding */ isDataHoleValue),
/* harmony export */   "isFalseyButZero": () => (/* binding */ isFalseyButZero),
/* harmony export */   "isMultiValue": () => (/* binding */ isMultiValue),
/* harmony export */   "isNumeric": () => (/* binding */ isNumeric),
/* harmony export */   "namespaces": () => (/* binding */ namespaces),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "normalizeData": () => (/* binding */ normalizeData),
/* harmony export */   "normalizePadding": () => (/* binding */ normalizePadding),
/* harmony export */   "optionsProvider": () => (/* binding */ optionsProvider),
/* harmony export */   "orderOfMagnitude": () => (/* binding */ orderOfMagnitude),
/* harmony export */   "polarToCartesian": () => (/* binding */ polarToCartesian),
/* harmony export */   "precision": () => (/* binding */ precision),
/* harmony export */   "projectLength": () => (/* binding */ projectLength),
/* harmony export */   "quantity": () => (/* binding */ quantity),
/* harmony export */   "rho": () => (/* binding */ rho),
/* harmony export */   "roundWithPrecision": () => (/* binding */ roundWithPrecision),
/* harmony export */   "safeHasProperty": () => (/* binding */ safeHasProperty),
/* harmony export */   "serialMap": () => (/* binding */ serialMap),
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "splitIntoSegments": () => (/* binding */ splitIntoSegments),
/* harmony export */   "sum": () => (/* binding */ sum),
/* harmony export */   "times": () => (/* binding */ times)
/* harmony export */ });
/**
 * This object contains all namespaces used within Chartist.
 */ const namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xmlns: "http://www.w3.org/2000/xmlns/",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    ct: "http://gionkunz.github.com/chartist-js/ct"
};
/**
 * Precision level used internally in Chartist for rounding. If you require more decimal places you can increase this number.
 */ const precision = 8;
/**
 * A map with characters to escape for strings to be safely used as attribute values.
 */ const escapingMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
};

/**
 * Converts a number to a string with a unit. If a string is passed then this will be returned unmodified.
 * @return Returns the passed number value with unit.
 */ function ensureUnit(value, unit) {
    if (typeof value === "number") {
        return value + unit;
    }
    return value;
}
/**
 * Converts a number or string to a quantity object.
 * @return Returns an object containing the value as number and the unit as string.
 */ function quantity(input) {
    if (typeof input === "string") {
        const match = /^(\d+)\s*(.*)$/g.exec(input);
        return {
            value: match ? +match[1] : 0,
            unit: (match === null || match === void 0 ? void 0 : match[2]) || undefined
        };
    }
    return {
        value: Number(input)
    };
}
/**
 * Generates a-z from a number 0 to 26
 * @param n A number from 0 to 26 that will result in a letter a-z
 * @return A character from a-z based on the input number n
 */ function alphaNumerate(n) {
    // Limit to a-z
    return String.fromCharCode(97 + n % 26);
}

const EPSILON = 2.221e-16;
/**
 * Calculate the order of magnitude for the chart scale
 * @param value The value Range of the chart
 * @return The order of magnitude
 */ function orderOfMagnitude(value) {
    return Math.floor(Math.log(Math.abs(value)) / Math.LN10);
}
/**
 * Project a data length into screen coordinates (pixels)
 * @param axisLength The svg element for the chart
 * @param length Single data value from a series array
 * @param bounds All the values to set the bounds of the chart
 * @return The projected data length in pixels
 */ function projectLength(axisLength, length, bounds) {
    return length / bounds.range * axisLength;
}
/**
 * This helper function can be used to round values with certain precision level after decimal. This is used to prevent rounding errors near float point precision limit.
 * @param value The value that should be rounded with precision
 * @param [digits] The number of digits after decimal used to do the rounding
 * @returns Rounded value
 */ function roundWithPrecision(value, digits) {
    const precision$1 = Math.pow(10, digits || precision);
    return Math.round(value * precision$1) / precision$1;
}
/**
 * Pollard Rho Algorithm to find smallest factor of an integer value. There are more efficient algorithms for factorization, but this one is quite efficient and not so complex.
 * @param num An integer number where the smallest factor should be searched for
 * @returns The smallest integer factor of the parameter num.
 */ function rho(num) {
    if (num === 1) {
        return num;
    }
    function gcd(p, q) {
        if (p % q === 0) {
            return q;
        } else {
            return gcd(q, p % q);
        }
    }
    function f(x) {
        return x * x + 1;
    }
    let x1 = 2;
    let x2 = 2;
    let divisor;
    if (num % 2 === 0) {
        return 2;
    }
    do {
        x1 = f(x1) % num;
        x2 = f(f(x2)) % num;
        divisor = gcd(Math.abs(x1 - x2), num);
    }while (divisor === 1);
    return divisor;
}
/**
 * Calculate cartesian coordinates of polar coordinates
 * @param centerX X-axis coordinates of center point of circle segment
 * @param centerY X-axis coordinates of center point of circle segment
 * @param radius Radius of circle segment
 * @param angleInDegrees Angle of circle segment in degrees
 * @return Coordinates of point on circumference
 */ function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

/**
 * Calculate and retrieve all the bounds for the chart and return them in one array
 * @param axisLength The length of the Axis used for
 * @param highLow An object containing a high and low property indicating the value range of the chart.
 * @param scaleMinSpace The minimum projected length a step should result in
 * @param onlyInteger
 * @return All the values to set the bounds of the chart
 */ function getBounds(axisLength, highLow, scaleMinSpace) {
    let onlyInteger = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    const bounds = {
        high: highLow.high,
        low: highLow.low,
        valueRange: 0,
        oom: 0,
        step: 0,
        min: 0,
        max: 0,
        range: 0,
        numberOfSteps: 0,
        values: []
    };
    bounds.valueRange = bounds.high - bounds.low;
    bounds.oom = orderOfMagnitude(bounds.valueRange);
    bounds.step = Math.pow(10, bounds.oom);
    bounds.min = Math.floor(bounds.low / bounds.step) * bounds.step;
    bounds.max = Math.ceil(bounds.high / bounds.step) * bounds.step;
    bounds.range = bounds.max - bounds.min;
    bounds.numberOfSteps = Math.round(bounds.range / bounds.step);
    // Optimize scale step by checking if subdivision is possible based on horizontalGridMinSpace
    // If we are already below the scaleMinSpace value we will scale up
    const length = projectLength(axisLength, bounds.step, bounds);
    const scaleUp = length < scaleMinSpace;
    const smallestFactor = onlyInteger ? rho(bounds.range) : 0;
    // First check if we should only use integer steps and if step 1 is still larger than scaleMinSpace so we can use 1
    if (onlyInteger && projectLength(axisLength, 1, bounds) >= scaleMinSpace) {
        bounds.step = 1;
    } else if (onlyInteger && smallestFactor < bounds.step && projectLength(axisLength, smallestFactor, bounds) >= scaleMinSpace) {
        // If step 1 was too small, we can try the smallest factor of range
        // If the smallest factor is smaller than the current bounds.step and the projected length of smallest factor
        // is larger than the scaleMinSpace we should go for it.
        bounds.step = smallestFactor;
    } else {
        // Trying to divide or multiply by 2 and find the best step value
        let optimizationCounter = 0;
        for(;;){
            if (scaleUp && projectLength(axisLength, bounds.step, bounds) <= scaleMinSpace) {
                bounds.step *= 2;
            } else if (!scaleUp && projectLength(axisLength, bounds.step / 2, bounds) >= scaleMinSpace) {
                bounds.step /= 2;
                if (onlyInteger && bounds.step % 1 !== 0) {
                    bounds.step *= 2;
                    break;
                }
            } else {
                break;
            }
            if (optimizationCounter++ > 1000) {
                throw new Error("Exceeded maximum number of iterations while optimizing scale step!");
            }
        }
    }
    bounds.step = Math.max(bounds.step, EPSILON);
    function safeIncrement(value, increment) {
        // If increment is too small use *= (1+EPSILON) as a simple nextafter
        if (value === (value += increment)) {
            value *= 1 + (increment > 0 ? EPSILON : -EPSILON);
        }
        return value;
    }
    // Narrow min and max based on new step
    let newMin = bounds.min;
    let newMax = bounds.max;
    while(newMin + bounds.step <= bounds.low){
        newMin = safeIncrement(newMin, bounds.step);
    }
    while(newMax - bounds.step >= bounds.high){
        newMax = safeIncrement(newMax, -bounds.step);
    }
    bounds.min = newMin;
    bounds.max = newMax;
    bounds.range = bounds.max - bounds.min;
    const values = [];
    for(let i = bounds.min; i <= bounds.max; i = safeIncrement(i, bounds.step)){
        const value = roundWithPrecision(i);
        if (value !== values[values.length - 1]) {
            values.push(value);
        }
    }
    bounds.values = values;
    return bounds;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend() {
    let target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    for(var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        sources[_key - 1] = arguments[_key];
    }
    for(let i = 0; i < sources.length; i++){
        const source = sources[i];
        for(const prop in source){
            const sourceProp = source[prop];
            if (typeof sourceProp === "object" && sourceProp !== null && !(sourceProp instanceof Array)) {
                target[prop] = extend(target[prop], sourceProp);
            } else {
                target[prop] = sourceProp;
            }
        }
    }
    return target;
}

/**
 * Helps to simplify functional style code
 * @param n This exact value will be returned by the noop function
 * @return The same value that was provided to the n parameter
 */ const noop = (n)=>n
;
/**
 * Functional style helper to produce array with given length initialized with undefined values
 */ const times = (length)=>Array.from({
        length
    })
;
/**
 * Sum helper to be used in reduce functions
 */ const sum = (previous, current)=>previous + (current ? current : 0)
;
/**
 * Map for multi dimensional arrays where their nested arrays will be mapped in serial. The output array will have the length of the largest nested array. The callback function is called with variable arguments where each argument is the nested array value (or undefined if there are no more values).
 *
 * For example:
 * @example
 * ```javascript
 * const data = [[1, 2], [3], []];
 * serialMap(data, cb);
 *
 * // where cb will be called 2 times
 * // 1. call arguments: (1, 3, undefined)
 * // 2. call arguments: (2, undefined, undefined)
 * ```
 */ const serialMap = (array, callback)=>times(Math.max(...array.map((element)=>element.length
    ))).map((_inner, index)=>callback(...array.map((element)=>element[index]
        ))
    )
;

function safeHasProperty(target, property) {
    return target !== null && typeof target === "object" && Reflect.has(target, property);
}
function isNumeric(value) {
    return value !== null && isFinite(value);
}
/**
 * Returns true on all falsey values except the numeric value 0.
 */ function isFalseyButZero(value) {
    return !value && value !== 0;
}
function getNumberOrUndefined(value) {
    return isNumeric(value) ? Number(value) : undefined;
}
/**
 * Checks if value is array of arrays or not.
 */ function isArrayOfArrays(data) {
    if (!Array.isArray(data)) {
        return false;
    }
    return data.every(Array.isArray);
}

/**
 * Get meta data of a specific value in a series.
 */ function getMetaData(seriesData, index) {
    const value = Array.isArray(seriesData) ? seriesData[index] : safeHasProperty(seriesData, "data") ? seriesData.data[index] : null;
    return safeHasProperty(value, "meta") ? value.meta : undefined;
}
function isDataHoleValue(value) {
    return value === null || value === undefined || typeof value === "number" && isNaN(value);
}
/**
 * Checks if value is array of series objects.
 */ function isArrayOfSeries(value) {
    return Array.isArray(value) && value.every((_)=>Array.isArray(_) || safeHasProperty(_, "data")
    );
}
/**
 * Checks if provided value object is multi value (contains x or y properties)
 */ function isMultiValue(value) {
    return typeof value === "object" && value !== null && (Reflect.has(value, "x") || Reflect.has(value, "y"));
}
/**
 * Gets a value from a dimension `value.x` or `value.y` while returning value directly if it's a valid numeric value. If the value is not numeric and it's falsey this function will return `defaultValue`.
 */ function getMultiValue(value) {
    let dimension = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "y";
    if (isMultiValue(value) && safeHasProperty(value, dimension)) {
        return getNumberOrUndefined(value[dimension]);
    } else {
        return getNumberOrUndefined(value);
    }
}

/**
 * Get highest and lowest value of data array. This Array contains the data that will be visualized in the chart.
 * @param data The array that contains the data to be visualized in the chart
 * @param options The Object that contains the chart options
 * @param dimension Axis dimension 'x' or 'y' used to access the correct value and high / low configuration
 * @return An object that contains the highest and lowest value that will be visualized on the chart.
 */ function getHighLow(data, options, dimension) {
    // TODO: Remove workaround for deprecated global high / low config. Axis high / low configuration is preferred
    options = {
        ...options,
        ...dimension ? dimension === "x" ? options.axisX : options.axisY : {}
    };
    const highLow = {
        high: options.high === undefined ? -Number.MAX_VALUE : +options.high,
        low: options.low === undefined ? Number.MAX_VALUE : +options.low
    };
    const findHigh = options.high === undefined;
    const findLow = options.low === undefined;
    // Function to recursively walk through arrays and find highest and lowest number
    function recursiveHighLow(sourceData) {
        if (isDataHoleValue(sourceData)) {
            return;
        } else if (Array.isArray(sourceData)) {
            for(let i = 0; i < sourceData.length; i++){
                recursiveHighLow(sourceData[i]);
            }
        } else {
            const value = Number(dimension && safeHasProperty(sourceData, dimension) ? sourceData[dimension] : sourceData);
            if (findHigh && value > highLow.high) {
                highLow.high = value;
            }
            if (findLow && value < highLow.low) {
                highLow.low = value;
            }
        }
    }
    // Start to find highest and lowest number recursively
    if (findHigh || findLow) {
        recursiveHighLow(data);
    }
    // Overrides of high / low based on reference value, it will make sure that the invisible reference value is
    // used to generate the chart. This is useful when the chart always needs to contain the position of the
    // invisible reference value in the view i.e. for bipolar scales.
    if (options.referenceValue || options.referenceValue === 0) {
        highLow.high = Math.max(options.referenceValue, highLow.high);
        highLow.low = Math.min(options.referenceValue, highLow.low);
    }
    // If high and low are the same because of misconfiguration or flat data (only the same value) we need
    // to set the high or low to 0 depending on the polarity
    if (highLow.high <= highLow.low) {
        // If both values are 0 we set high to 1
        if (highLow.low === 0) {
            highLow.high = 1;
        } else if (highLow.low < 0) {
            // If we have the same negative value for the bounds we set bounds.high to 0
            highLow.high = 0;
        } else if (highLow.high > 0) {
            // If we have the same positive value for the bounds we set bounds.low to 0
            highLow.low = 0;
        } else {
            // If data array was empty, values are Number.MAX_VALUE and -Number.MAX_VALUE. Set bounds to prevent errors
            highLow.high = 1;
            highLow.low = 0;
        }
    }
    return highLow;
}

function normalizeData(data) {
    let reverse = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, multi = arguments.length > 2 ? arguments[2] : void 0, distributed = arguments.length > 3 ? arguments[3] : void 0;
    let labelCount;
    const normalized = {
        labels: [],
        series: normalizeSeries(data.series, multi, distributed)
    };
    // If all elements of the normalized data array are arrays we're dealing with
    // multi series data and we need to find the largest series if they are un-even
    if (isArrayOfArrays(normalized.series)) {
        // Getting the series with the the most elements
        labelCount = Math.max(...normalized.series.map((series)=>series.length
        ));
    } else {
        // We're dealing with Pie data so we just take the normalized array length
        labelCount = normalized.series.length;
    }
    normalized.labels = (data.labels || []).slice();
    // Padding the labels to labelCount with empty strings
    normalized.labels.push(...times(Math.max(0, labelCount - normalized.labels.length)).map(()=>""
    ));
    if (reverse) {
        reverseData(normalized);
    }
    return normalized;
}
/**
 * Reverses the series, labels and series data arrays.
 */ function reverseData(data) {
    var ref;
    (ref = data.labels) === null || ref === void 0 ? void 0 : ref.reverse();
    data.series.reverse();
    for (const series of data.series){
        if (safeHasProperty(series, "data")) {
            series.data.reverse();
        } else if (Array.isArray(series)) {
            series.reverse();
        }
    }
}
function normalizeMulti(value, multi) {
    // We need to prepare multi value output (x and y data)
    let x;
    let y;
    // Single series value arrays are assumed to specify the Y-Axis value
    // For example: [1, 2] => [{x: undefined, y: 1}, {x: undefined, y: 2}]
    // If multi is a string then it's assumed that it specified which dimension should be filled as default
    if (typeof value !== "object") {
        const num = getNumberOrUndefined(value);
        if (multi === "x") {
            x = num;
        } else {
            y = num;
        }
    } else {
        if (safeHasProperty(value, "x")) {
            x = getNumberOrUndefined(value.x);
        }
        if (safeHasProperty(value, "y")) {
            y = getNumberOrUndefined(value.y);
        }
    }
    if (x === undefined && y === undefined) {
        return undefined;
    }
    return {
        x,
        y
    };
}
function normalizePrimitive(value, multi) {
    if (isDataHoleValue(value)) {
        // We're dealing with a hole in the data and therefore need to return undefined
        // We're also returning undefined for multi value output
        return undefined;
    }
    if (multi) {
        return normalizeMulti(value, multi);
    }
    return getNumberOrUndefined(value);
}
function normalizeSingleSeries(series, multi) {
    if (!Array.isArray(series)) {
        // We are dealing with series object notation so we need to recurse on data property
        return normalizeSingleSeries(series.data, multi);
    }
    return series.map((value)=>{
        if (safeHasProperty(value, "value")) {
            // We are dealing with value object notation so we need to recurse on value property
            return normalizePrimitive(value.value, multi);
        }
        return normalizePrimitive(value, multi);
    });
}
function normalizeSeries(series, multi, distributed) {
    if (isArrayOfSeries(series)) {
        return series.map((_)=>normalizeSingleSeries(_, multi)
        );
    }
    const normalizedSeries = normalizeSingleSeries(series, multi);
    if (distributed) {
        return normalizedSeries.map((value)=>[
                value
            ]
        );
    }
    return normalizedSeries;
}

/**
 * Splits a list of coordinates and associated values into segments. Each returned segment contains a pathCoordinates
 * valueData property describing the segment.
 *
 * With the default options, segments consist of contiguous sets of points that do not have an undefined value. Any
 * points with undefined values are discarded.
 *
 * **Options**
 * The following options are used to determine how segments are formed
 * ```javascript
 * var options = {
 *   // If fillHoles is true, undefined values are simply discarded without creating a new segment. Assuming other options are default, this returns single segment.
 *   fillHoles: false,
 *   // If increasingX is true, the coordinates in all segments have strictly increasing x-values.
 *   increasingX: false
 * };
 * ```
 *
 * @param pathCoordinates List of point coordinates to be split in the form [x1, y1, x2, y2 ... xn, yn]
 * @param valueData List of associated point values in the form [v1, v2 .. vn]
 * @param options Options set by user
 * @return List of segments, each containing a pathCoordinates and valueData property.
 */ function splitIntoSegments(pathCoordinates, valueData, options) {
    const finalOptions = {
        increasingX: false,
        fillHoles: false,
        ...options
    };
    const segments = [];
    let hole = true;
    for(let i = 0; i < pathCoordinates.length; i += 2){
        // If this value is a "hole" we set the hole flag
        if (getMultiValue(valueData[i / 2].value) === undefined) {
            // if(valueData[i / 2].value === undefined) {
            if (!finalOptions.fillHoles) {
                hole = true;
            }
        } else {
            if (finalOptions.increasingX && i >= 2 && pathCoordinates[i] <= pathCoordinates[i - 2]) {
                // X is not increasing, so we need to make sure we start a new segment
                hole = true;
            }
            // If it's a valid value we need to check if we're coming out of a hole and create a new empty segment
            if (hole) {
                segments.push({
                    pathCoordinates: [],
                    valueData: []
                });
                // As we have a valid value now, we are not in a "hole" anymore
                hole = false;
            }
            // Add to the segment pathCoordinates and valueData
            segments[segments.length - 1].pathCoordinates.push(pathCoordinates[i], pathCoordinates[i + 1]);
            segments[segments.length - 1].valueData.push(valueData[i / 2]);
        }
    }
    return segments;
}

function serialize(data) {
    let serialized = "";
    if (data === null || data === undefined) {
        return data;
    } else if (typeof data === "number") {
        serialized = "" + data;
    } else if (typeof data === "object") {
        serialized = JSON.stringify({
            data: data
        });
    } else {
        serialized = String(data);
    }
    return Object.keys(escapingMap).reduce((result, key)=>result.replaceAll(key, escapingMap[key])
    , serialized);
}
function deserialize(data) {
    if (typeof data !== "string") {
        return data;
    }
    if (data === "NaN") {
        return NaN;
    }
    data = Object.keys(escapingMap).reduce((result, key)=>result.replaceAll(escapingMap[key], key)
    , data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsedData = data;
    if (typeof data === "string") {
        try {
            parsedData = JSON.parse(data);
            parsedData = parsedData.data !== undefined ? parsedData.data : parsedData;
        } catch (e) {
        /* Ingore */ }
    }
    return parsedData;
}

/**
 * This helper class is to wrap multiple `Svg` elements into a list where you can call the `Svg` functions on all elements in the list with one call. This is helpful when you'd like to perform calls with `Svg` on multiple elements.
 * An instance of this class is also returned by `Svg.querySelectorAll`.
 */ class SvgList {
    call(method, args) {
        this.svgElements.forEach((element)=>Reflect.apply(element[method], element, args)
        );
        return this;
    }
    attr() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("attr", args);
    }
    elem() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("elem", args);
    }
    root() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("root", args);
    }
    getNode() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("getNode", args);
    }
    foreignObject() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("foreignObject", args);
    }
    text() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("text", args);
    }
    empty() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("empty", args);
    }
    remove() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("remove", args);
    }
    addClass() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("addClass", args);
    }
    removeClass() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("removeClass", args);
    }
    removeAllClasses() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("removeAllClasses", args);
    }
    animate() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.call("animate", args);
    }
    /**
   * @param nodeList An Array of SVG DOM nodes or a SVG DOM NodeList (as returned by document.querySelectorAll)
   */ constructor(nodeList){
        this.svgElements = [];
        for(let i = 0; i < nodeList.length; i++){
            this.svgElements.push(new Svg(nodeList[i]));
        }
    }
}

/**
 * This Object contains some standard easing cubic bezier curves.
 * Then can be used with their name in the `Svg.animate`.
 * You can also extend the list and use your own name in the `animate` function.
 * Click the show code button to see the available bezier functions.
 */ const easings = {
    easeInSine: [
        0.47,
        0,
        0.745,
        0.715
    ],
    easeOutSine: [
        0.39,
        0.575,
        0.565,
        1
    ],
    easeInOutSine: [
        0.445,
        0.05,
        0.55,
        0.95
    ],
    easeInQuad: [
        0.55,
        0.085,
        0.68,
        0.53
    ],
    easeOutQuad: [
        0.25,
        0.46,
        0.45,
        0.94
    ],
    easeInOutQuad: [
        0.455,
        0.03,
        0.515,
        0.955
    ],
    easeInCubic: [
        0.55,
        0.055,
        0.675,
        0.19
    ],
    easeOutCubic: [
        0.215,
        0.61,
        0.355,
        1
    ],
    easeInOutCubic: [
        0.645,
        0.045,
        0.355,
        1
    ],
    easeInQuart: [
        0.895,
        0.03,
        0.685,
        0.22
    ],
    easeOutQuart: [
        0.165,
        0.84,
        0.44,
        1
    ],
    easeInOutQuart: [
        0.77,
        0,
        0.175,
        1
    ],
    easeInQuint: [
        0.755,
        0.05,
        0.855,
        0.06
    ],
    easeOutQuint: [
        0.23,
        1,
        0.32,
        1
    ],
    easeInOutQuint: [
        0.86,
        0,
        0.07,
        1
    ],
    easeInExpo: [
        0.95,
        0.05,
        0.795,
        0.035
    ],
    easeOutExpo: [
        0.19,
        1,
        0.22,
        1
    ],
    easeInOutExpo: [
        1,
        0,
        0,
        1
    ],
    easeInCirc: [
        0.6,
        0.04,
        0.98,
        0.335
    ],
    easeOutCirc: [
        0.075,
        0.82,
        0.165,
        1
    ],
    easeInOutCirc: [
        0.785,
        0.135,
        0.15,
        0.86
    ],
    easeInBack: [
        0.6,
        -0.28,
        0.735,
        0.045
    ],
    easeOutBack: [
        0.175,
        0.885,
        0.32,
        1.275
    ],
    easeInOutBack: [
        0.68,
        -0.55,
        0.265,
        1.55
    ]
};
function createAnimation(element, attribute, animationDefinition) {
    let createGuided = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false, eventEmitter = arguments.length > 4 ? arguments[4] : void 0;
    const { easing , ...def } = animationDefinition;
    const attributeProperties = {};
    let animationEasing;
    let timeout;
    // Check if an easing is specified in the definition object and delete it from the object as it will not
    // be part of the animate element attributes.
    if (easing) {
        // If already an easing Bézier curve array we take it or we lookup a easing array in the Easing object
        animationEasing = Array.isArray(easing) ? easing : easings[easing];
    }
    // If numeric dur or begin was provided we assume milli seconds
    def.begin = ensureUnit(def.begin, "ms");
    def.dur = ensureUnit(def.dur, "ms");
    if (animationEasing) {
        def.calcMode = "spline";
        def.keySplines = animationEasing.join(" ");
        def.keyTimes = "0;1";
    }
    // Adding "fill: freeze" if we are in guided mode and set initial attribute values
    if (createGuided) {
        def.fill = "freeze";
        // Animated property on our element should already be set to the animation from value in guided mode
        attributeProperties[attribute] = def.from;
        element.attr(attributeProperties);
        // In guided mode we also set begin to indefinite so we can trigger the start manually and put the begin
        // which needs to be in ms aside
        timeout = quantity(def.begin || 0).value;
        def.begin = "indefinite";
    }
    const animate = element.elem("animate", {
        attributeName: attribute,
        ...def
    });
    if (createGuided) {
        // If guided we take the value that was put aside in timeout and trigger the animation manually with a timeout
        setTimeout(()=>{
            // If beginElement fails we set the animated attribute to the end position and remove the animate element
            // This happens if the SMIL ElementTimeControl interface is not supported or any other problems occurred in
            // the browser. (Currently FF 34 does not support animate elements in foreignObjects)
            try {
                // @ts-expect-error Try legacy API.
                animate._node.beginElement();
            } catch (err) {
                // Set animated attribute to current animated value
                attributeProperties[attribute] = def.to;
                element.attr(attributeProperties);
                // Remove the animate element as it's no longer required
                animate.remove();
            }
        }, timeout);
    }
    const animateNode = animate.getNode();
    if (eventEmitter) {
        animateNode.addEventListener("beginEvent", ()=>eventEmitter.emit("animationBegin", {
                element: element,
                animate: animateNode,
                params: animationDefinition
            })
        );
    }
    animateNode.addEventListener("endEvent", ()=>{
        if (eventEmitter) {
            eventEmitter.emit("animationEnd", {
                element: element,
                animate: animateNode,
                params: animationDefinition
            });
        }
        if (createGuided) {
            // Set animated attribute to current animated value
            attributeProperties[attribute] = def.to;
            element.attr(attributeProperties);
            // Remove the animate element as it's no longer required
            animate.remove();
        }
    });
}

/**
 * Svg creates a new SVG object wrapper with a starting element. You can use the wrapper to fluently create sub-elements and modify them.
 */ class Svg {
    attr(attributes, ns) {
        if (typeof attributes === "string") {
            if (ns) {
                return this._node.getAttributeNS(ns, attributes);
            } else {
                return this._node.getAttribute(attributes);
            }
        }
        Object.keys(attributes).forEach((key)=>{
            // If the attribute value is undefined we can skip this one
            if (attributes[key] === undefined) {
                return;
            }
            if (key.indexOf(":") !== -1) {
                const namespacedAttribute = key.split(":");
                this._node.setAttributeNS(namespaces[namespacedAttribute[0]], key, String(attributes[key]));
            } else {
                this._node.setAttribute(key, String(attributes[key]));
            }
        });
        return this;
    }
    /**
   * Create a new SVG element whose wrapper object will be selected for further operations. This way you can also create nested groups easily.
   * @param name The name of the SVG element that should be created as child element of the currently selected element wrapper
   * @param attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param className This class or class list will be added to the SVG element
   * @param insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   * @return Returns a Svg wrapper object that can be used to modify the containing SVG data
   */ elem(name, attributes, className) {
        let insertFirst = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        return new Svg(name, attributes, className, this, insertFirst);
    }
    /**
   * Returns the parent Chartist.SVG wrapper object
   * @return Returns a Svg wrapper around the parent node of the current node. If the parent node is not existing or it's not an SVG node then this function will return null.
   */ parent() {
        return this._node.parentNode instanceof SVGElement ? new Svg(this._node.parentNode) : null;
    }
    /**
   * This method returns a Svg wrapper around the root SVG element of the current tree.
   * @return The root SVG element wrapped in a Svg element
   */ root() {
        let node = this._node;
        while(node.nodeName !== "svg"){
            if (node.parentElement) {
                node = node.parentElement;
            } else {
                break;
            }
        }
        return new Svg(node);
    }
    /**
   * Find the first child SVG element of the current element that matches a CSS selector. The returned object is a Svg wrapper.
   * @param selector A CSS selector that is used to query for child SVG elements
   * @return The SVG wrapper for the element found or null if no element was found
   */ querySelector(selector) {
        const foundNode = this._node.querySelector(selector);
        return foundNode ? new Svg(foundNode) : null;
    }
    /**
   * Find the all child SVG elements of the current element that match a CSS selector. The returned object is a Svg.List wrapper.
   * @param selector A CSS selector that is used to query for child SVG elements
   * @return The SVG wrapper list for the element found or null if no element was found
   */ querySelectorAll(selector) {
        const foundNodes = this._node.querySelectorAll(selector);
        return new SvgList(foundNodes);
    }
    /**
   * Returns the underlying SVG node for the current element.
   */ getNode() {
        return this._node;
    }
    /**
   * This method creates a foreignObject (see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) that allows to embed HTML content into a SVG graphic. With the help of foreignObjects you can enable the usage of regular HTML elements inside of SVG where they are subject for SVG positioning and transformation but the Browser will use the HTML rendering capabilities for the containing DOM.
   * @param content The DOM Node, or HTML string that will be converted to a DOM Node, that is then placed into and wrapped by the foreignObject
   * @param attributes An object with properties that will be added as attributes to the foreignObject element that is created. Attributes with undefined values will not be added.
   * @param className This class or class list will be added to the SVG element
   * @param insertFirst Specifies if the foreignObject should be inserted as first child
   * @return New wrapper object that wraps the foreignObject element
   */ foreignObject(content, attributes, className) {
        let insertFirst = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        let contentNode;
        // If content is string then we convert it to DOM
        // TODO: Handle case where content is not a string nor a DOM Node
        if (typeof content === "string") {
            const container = document.createElement("div");
            container.innerHTML = content;
            contentNode = container.firstChild;
        } else {
            contentNode = content;
        }
        if (contentNode instanceof Element) {
            // Adding namespace to content element
            contentNode.setAttribute("xmlns", namespaces.xmlns);
        }
        // Creating the foreignObject without required extension attribute (as described here
        // http://www.w3.org/TR/SVG/extend.html#ForeignObjectElement)
        const fnObj = this.elem("foreignObject", attributes, className, insertFirst);
        // Add content to foreignObjectElement
        fnObj._node.appendChild(contentNode);
        return fnObj;
    }
    /**
   * This method adds a new text element to the current Svg wrapper.
   * @param t The text that should be added to the text element that is created
   * @return The same wrapper object that was used to add the newly created element
   */ text(t) {
        this._node.appendChild(document.createTextNode(t));
        return this;
    }
    /**
   * This method will clear all child nodes of the current wrapper object.
   * @return The same wrapper object that got emptied
   */ empty() {
        while(this._node.firstChild){
            this._node.removeChild(this._node.firstChild);
        }
        return this;
    }
    /**
   * This method will cause the current wrapper to remove itself from its parent wrapper. Use this method if you'd like to get rid of an element in a given DOM structure.
   * @return The parent wrapper object of the element that got removed
   */ remove() {
        var ref;
        (ref = this._node.parentNode) === null || ref === void 0 ? void 0 : ref.removeChild(this._node);
        return this.parent();
    }
    /**
   * This method will replace the element with a new element that can be created outside of the current DOM.
   * @param newElement The new Svg object that will be used to replace the current wrapper object
   * @return The wrapper of the new element
   */ replace(newElement) {
        var ref;
        (ref = this._node.parentNode) === null || ref === void 0 ? void 0 : ref.replaceChild(newElement._node, this._node);
        return newElement;
    }
    /**
   * This method will append an element to the current element as a child.
   * @param element The Svg element that should be added as a child
   * @param insertFirst Specifies if the element should be inserted as first child
   * @return The wrapper of the appended object
   */ append(element) {
        let insertFirst = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (insertFirst && this._node.firstChild) {
            this._node.insertBefore(element._node, this._node.firstChild);
        } else {
            this._node.appendChild(element._node);
        }
        return this;
    }
    /**
   * Returns an array of class names that are attached to the current wrapper element. This method can not be chained further.
   * @return A list of classes or an empty array if there are no classes on the current element
   */ classes() {
        const classNames = this._node.getAttribute("class");
        return classNames ? classNames.trim().split(/\s+/) : [];
    }
    /**
   * Adds one or a space separated list of classes to the current element and ensures the classes are only existing once.
   * @param names A white space separated list of class names
   * @return The wrapper of the current element
   */ addClass(names) {
        this._node.setAttribute("class", this.classes().concat(names.trim().split(/\s+/)).filter(function(elem, pos, self) {
            return self.indexOf(elem) === pos;
        }).join(" "));
        return this;
    }
    /**
   * Removes one or a space separated list of classes from the current element.
   * @param names A white space separated list of class names
   * @return The wrapper of the current element
   */ removeClass(names) {
        const removedClasses = names.trim().split(/\s+/);
        this._node.setAttribute("class", this.classes().filter((name)=>removedClasses.indexOf(name) === -1
        ).join(" "));
        return this;
    }
    /**
   * Removes all classes from the current element.
   * @return The wrapper of the current element
   */ removeAllClasses() {
        this._node.setAttribute("class", "");
        return this;
    }
    /**
   * Get element height using `getBoundingClientRect`
   * @return The elements height in pixels
   */ height() {
        return this._node.getBoundingClientRect().height;
    }
    /**
   * Get element width using `getBoundingClientRect`
   * @return The elements width in pixels
   */ width() {
        return this._node.getBoundingClientRect().width;
    }
    /**
   * The animate function lets you animate the current element with SMIL animations. You can add animations for multiple attributes at the same time by using an animation definition object. This object should contain SMIL animation attributes. Please refer to http://www.w3.org/TR/SVG/animate.html for a detailed specification about the available animation attributes. Additionally an easing property can be passed in the animation definition object. This can be a string with a name of an easing function in `Svg.Easing` or an array with four numbers specifying a cubic Bézier curve.
   * **An animations object could look like this:**
   * ```javascript
   * element.animate({
   *   opacity: {
   *     dur: 1000,
   *     from: 0,
   *     to: 1
   *   },
   *   x1: {
   *     dur: '1000ms',
   *     from: 100,
   *     to: 200,
   *     easing: 'easeOutQuart'
   *   },
   *   y1: {
   *     dur: '2s',
   *     from: 0,
   *     to: 100
   *   }
   * });
   * ```
   * **Automatic unit conversion**
   * For the `dur` and the `begin` animate attribute you can also omit a unit by passing a number. The number will automatically be converted to milli seconds.
   * **Guided mode**
   * The default behavior of SMIL animations with offset using the `begin` attribute is that the attribute will keep it's original value until the animation starts. Mostly this behavior is not desired as you'd like to have your element attributes already initialized with the animation `from` value even before the animation starts. Also if you don't specify `fill="freeze"` on an animate element or if you delete the animation after it's done (which is done in guided mode) the attribute will switch back to the initial value. This behavior is also not desired when performing simple one-time animations. For one-time animations you'd want to trigger animations immediately instead of relative to the document begin time. That's why in guided mode Svg will also use the `begin` property to schedule a timeout and manually start the animation after the timeout. If you're using multiple SMIL definition objects for an attribute (in an array), guided mode will be disabled for this attribute, even if you explicitly enabled it.
   * If guided mode is enabled the following behavior is added:
   * - Before the animation starts (even when delayed with `begin`) the animated attribute will be set already to the `from` value of the animation
   * - `begin` is explicitly set to `indefinite` so it can be started manually without relying on document begin time (creation)
   * - The animate element will be forced to use `fill="freeze"`
   * - The animation will be triggered with `beginElement()` in a timeout where `begin` of the definition object is interpreted in milli seconds. If no `begin` was specified the timeout is triggered immediately.
   * - After the animation the element attribute value will be set to the `to` value of the animation
   * - The animate element is deleted from the DOM
   * @param animations An animations object where the property keys are the attributes you'd like to animate. The properties should be objects again that contain the SMIL animation attributes (usually begin, dur, from, and to). The property begin and dur is auto converted (see Automatic unit conversion). You can also schedule multiple animations for the same attribute by passing an Array of SMIL definition objects. Attributes that contain an array of SMIL definition objects will not be executed in guided mode.
   * @param guided Specify if guided mode should be activated for this animation (see Guided mode). If not otherwise specified, guided mode will be activated.
   * @param eventEmitter If specified, this event emitter will be notified when an animation starts or ends.
   * @return The current element where the animation was added
   */ animate(animations) {
        let guided = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, eventEmitter = arguments.length > 2 ? arguments[2] : void 0;
        Object.keys(animations).forEach((attribute)=>{
            const attributeAnimation = animations[attribute];
            // If current attribute is an array of definition objects we create an animate for each and disable guided mode
            if (Array.isArray(attributeAnimation)) {
                attributeAnimation.forEach((animationDefinition)=>createAnimation(this, attribute, animationDefinition, false, eventEmitter)
                );
            } else {
                createAnimation(this, attribute, attributeAnimation, guided, eventEmitter);
            }
        });
        return this;
    }
    /**
   * @param name The name of the SVG element to create or an SVG dom element which should be wrapped into Svg
   * @param attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param className This class or class list will be added to the SVG element
   * @param parent The parent SVG wrapper object where this newly created wrapper and it's element will be attached to as child
   * @param insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   */ constructor(name, attributes, className, parent, insertFirst = false){
        // If Svg is getting called with an SVG element we just return the wrapper
        if (name instanceof Element) {
            this._node = name;
        } else {
            this._node = document.createElementNS(namespaces.svg, name);
            // If this is an SVG element created then custom namespace
            if (name === "svg") {
                this.attr({
                    "xmlns:ct": namespaces.ct
                });
            }
        }
        if (attributes) {
            this.attr(attributes);
        }
        if (className) {
            this.addClass(className);
        }
        if (parent) {
            if (insertFirst && parent._node.firstChild) {
                parent._node.insertBefore(this._node, parent._node.firstChild);
            } else {
                parent._node.appendChild(this._node);
            }
        }
    }
}
/**
   * @todo Only there for chartist <1 compatibility. Remove after deprecation warining.
   * @deprecated Use the animation module export `easings` directly.
   */ Svg.Easing = easings;

/**
 * Create or reinitialize the SVG element for the chart
 * @param container The containing DOM Node object that will be used to plant the SVG element
 * @param width Set the width of the SVG element. Default is 100%
 * @param height Set the height of the SVG element. Default is 100%
 * @param className Specify a class to be added to the SVG element
 * @return The created/reinitialized SVG element
 */ function createSvg(container) {
    let width = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "100%", height = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "100%", className = arguments.length > 3 ? arguments[3] : void 0;
    // Check if there is a previous SVG element in the container that contains the Chartist XML namespace and remove it
    // Since the DOM API does not support namespaces we need to manually search the returned list http://www.w3.org/TR/selectors-api/
    Array.from(container.querySelectorAll("svg")).filter((svg)=>svg.getAttributeNS(namespaces.xmlns, "ct")
    ).forEach((svg)=>container.removeChild(svg)
    );
    // Create svg object with width and height or use 100% as default
    const svg1 = new Svg("svg").attr({
        width,
        height
    }).attr({
        // TODO: Check better solution (browser support) and remove inline styles due to CSP
        style: "width: ".concat(width, "; height: ").concat(height, ";")
    });
    if (className) {
        svg1.addClass(className);
    }
    // Add the DOM node to our container
    container.appendChild(svg1.getNode());
    return svg1;
}
/**
 * Converts a number into a padding object.
 * @param padding
 * @param fallback This value is used to fill missing values if a incomplete padding object was passed
 * @returns Returns a padding object containing top, right, bottom, left properties filled with the padding number passed in as argument. If the argument is something else than a number (presumably already a correct padding object) then this argument is directly returned.
 */ function normalizePadding(padding) {
    return typeof padding === "number" ? {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding
    } : padding === undefined ? {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    } : {
        top: typeof padding.top === "number" ? padding.top : 0,
        right: typeof padding.right === "number" ? padding.right : 0,
        bottom: typeof padding.bottom === "number" ? padding.bottom : 0,
        left: typeof padding.left === "number" ? padding.left : 0
    };
}
/**
 * Initialize chart drawing rectangle (area where chart is drawn) x1,y1 = bottom left / x2,y2 = top right
 * @param svg The svg element for the chart
 * @param options The Object that contains all the optional values for the chart
 * @return The chart rectangles coordinates inside the svg element plus the rectangles measurements
 */ function createChartRect(svg, options) {
    var ref, ref1, ref2, ref3;
    const hasAxis = Boolean(options.axisX || options.axisY);
    const yAxisOffset = ((ref = options.axisY) === null || ref === void 0 ? void 0 : ref.offset) || 0;
    const xAxisOffset = ((ref1 = options.axisX) === null || ref1 === void 0 ? void 0 : ref1.offset) || 0;
    const yAxisPosition = (ref2 = options.axisY) === null || ref2 === void 0 ? void 0 : ref2.position;
    const xAxisPosition = (ref3 = options.axisX) === null || ref3 === void 0 ? void 0 : ref3.position;
    // If width or height results in invalid value (including 0) we fallback to the unitless settings or even 0
    let width = svg.width() || quantity(options.width).value || 0;
    let height = svg.height() || quantity(options.height).value || 0;
    const normalizedPadding = normalizePadding(options.chartPadding);
    // If settings were to small to cope with offset (legacy) and padding, we'll adjust
    width = Math.max(width, yAxisOffset + normalizedPadding.left + normalizedPadding.right);
    height = Math.max(height, xAxisOffset + normalizedPadding.top + normalizedPadding.bottom);
    const chartRect = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0,
        padding: normalizedPadding,
        width () {
            return this.x2 - this.x1;
        },
        height () {
            return this.y1 - this.y2;
        }
    };
    if (hasAxis) {
        if (xAxisPosition === "start") {
            chartRect.y2 = normalizedPadding.top + xAxisOffset;
            chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
        } else {
            chartRect.y2 = normalizedPadding.top;
            chartRect.y1 = Math.max(height - normalizedPadding.bottom - xAxisOffset, chartRect.y2 + 1);
        }
        if (yAxisPosition === "start") {
            chartRect.x1 = normalizedPadding.left + yAxisOffset;
            chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
        } else {
            chartRect.x1 = normalizedPadding.left;
            chartRect.x2 = Math.max(width - normalizedPadding.right - yAxisOffset, chartRect.x1 + 1);
        }
    } else {
        chartRect.x1 = normalizedPadding.left;
        chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
        chartRect.y2 = normalizedPadding.top;
        chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
    }
    return chartRect;
}
/**
 * Creates a grid line based on a projected value.
 */ function createGrid(position, index, axis, offset, length, group, classes, eventEmitter) {
    const positionalData = {
        ["".concat(axis.units.pos, "1")]: position,
        ["".concat(axis.units.pos, "2")]: position,
        ["".concat(axis.counterUnits.pos, "1")]: offset,
        ["".concat(axis.counterUnits.pos, "2")]: offset + length
    };
    const gridElement = group.elem("line", positionalData, classes.join(" "));
    // Event for grid draw
    eventEmitter.emit("draw", {
        type: "grid",
        axis,
        index,
        group,
        element: gridElement,
        ...positionalData
    });
}
/**
 * Creates a grid background rect and emits the draw event.
 */ function createGridBackground(gridGroup, chartRect, className, eventEmitter) {
    const gridBackground = gridGroup.elem("rect", {
        x: chartRect.x1,
        y: chartRect.y2,
        width: chartRect.width(),
        height: chartRect.height()
    }, className, true);
    // Event for grid background draw
    eventEmitter.emit("draw", {
        type: "gridBackground",
        group: gridGroup,
        element: gridBackground
    });
}
/**
 * Creates a label based on a projected value and an axis.
 */ function createLabel(position, length, index, label, axis, axisOffset, labelOffset, group, classes, eventEmitter) {
    const positionalData = {
        [axis.units.pos]: position + labelOffset[axis.units.pos],
        [axis.counterUnits.pos]: labelOffset[axis.counterUnits.pos],
        [axis.units.len]: length,
        [axis.counterUnits.len]: Math.max(0, axisOffset - 10)
    };
    // We need to set width and height explicitly to px as span will not expand with width and height being
    // 100% in all browsers
    const stepLength = Math.round(positionalData[axis.units.len]);
    const stepCounterLength = Math.round(positionalData[axis.counterUnits.len]);
    const content = document.createElement("span");
    content.className = classes.join(" ");
    content.style[axis.units.len] = stepLength + "px";
    content.style[axis.counterUnits.len] = stepCounterLength + "px";
    content.textContent = String(label);
    const labelElement = group.foreignObject(content, {
        style: "overflow: visible;",
        ...positionalData
    });
    eventEmitter.emit("draw", {
        type: "label",
        axis,
        index,
        group,
        element: labelElement,
        text: label,
        ...positionalData
    });
}

/**
 * Provides options handling functionality with callback for options changes triggered by responsive options and media query matches
 * @param options Options set by user
 * @param responsiveOptions Optional functions to add responsive behavior to chart
 * @param eventEmitter The event emitter that will be used to emit the options changed events
 * @return The consolidated options object from the defaults, base and matching responsive options
 */ function optionsProvider(options, responsiveOptions, eventEmitter) {
    let currentOptions;
    const mediaQueryListeners = [];
    function updateCurrentOptions(mediaEvent) {
        const previousOptions = currentOptions;
        currentOptions = extend({}, options);
        if (responsiveOptions) {
            responsiveOptions.forEach((responsiveOption)=>{
                const mql = window.matchMedia(responsiveOption[0]);
                if (mql.matches) {
                    currentOptions = extend(currentOptions, responsiveOption[1]);
                }
            });
        }
        if (eventEmitter && mediaEvent) {
            eventEmitter.emit("optionsChanged", {
                previousOptions,
                currentOptions
            });
        }
    }
    function removeMediaQueryListeners() {
        mediaQueryListeners.forEach((mql)=>mql.removeEventListener("change", updateCurrentOptions)
        );
    }
    if (!window.matchMedia) {
        throw new Error("window.matchMedia not found! Make sure you're using a polyfill.");
    } else if (responsiveOptions) {
        responsiveOptions.forEach((responsiveOption)=>{
            const mql = window.matchMedia(responsiveOption[0]);
            mql.addEventListener("change", updateCurrentOptions);
            mediaQueryListeners.push(mql);
        });
    }
    // Execute initially without an event argument so we get the correct options
    updateCurrentOptions();
    return {
        removeMediaQueryListeners,
        getCurrentOptions () {
            return currentOptions;
        }
    };
}

/**
 * Contains the descriptors of supported element types in a SVG path. Currently only move, line and curve are supported.
 */ const elementDescriptions = {
    m: [
        "x",
        "y"
    ],
    l: [
        "x",
        "y"
    ],
    c: [
        "x1",
        "y1",
        "x2",
        "y2",
        "x",
        "y"
    ],
    a: [
        "rx",
        "ry",
        "xAr",
        "lAf",
        "sf",
        "x",
        "y"
    ]
};
/**
 * Default options for newly created SVG path objects.
 */ const defaultOptions$3 = {
    // The accuracy in digit count after the decimal point. This will be used to round numbers in the SVG path. If this option is set to false then no rounding will be performed.
    accuracy: 3
};
function element(command, params, pathElements, pos, relative, data) {
    const pathElement = {
        command: relative ? command.toLowerCase() : command.toUpperCase(),
        ...params,
        ...data ? {
            data
        } : {}
    };
    pathElements.splice(pos, 0, pathElement);
}
function forEachParam(pathElements, cb) {
    pathElements.forEach((pathElement, pathElementIndex)=>{
        elementDescriptions[pathElement.command.toLowerCase()].forEach((paramName, paramIndex)=>{
            cb(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
        });
    });
}
class SvgPath {
    /**
   * This static function on `SvgPath` is joining multiple paths together into one paths.
   * @param paths A list of paths to be joined together. The order is important.
   * @param close If the newly created path should be a closed path
   * @param options Path options for the newly created path.
   */ static join(paths) {
        let close = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, options = arguments.length > 2 ? arguments[2] : void 0;
        const joinedPath = new SvgPath(close, options);
        for(let i = 0; i < paths.length; i++){
            const path = paths[i];
            for(let j = 0; j < path.pathElements.length; j++){
                joinedPath.pathElements.push(path.pathElements[j]);
            }
        }
        return joinedPath;
    }
    position(pos) {
        if (pos !== undefined) {
            this.pos = Math.max(0, Math.min(this.pathElements.length, pos));
            return this;
        } else {
            return this.pos;
        }
    }
    /**
   * Removes elements from the path starting at the current position.
   * @param count Number of path elements that should be removed from the current position.
   * @return The current path object for easy call chaining.
   */ remove(count) {
        this.pathElements.splice(this.pos, count);
        return this;
    }
    /**
   * Use this function to add a new move SVG path element.
   * @param x The x coordinate for the move element.
   * @param y The y coordinate for the move element.
   * @param relative If set to true the move element will be created with relative coordinates (lowercase letter)
   * @param data Any data that should be stored with the element object that will be accessible in pathElement
   * @return The current path object for easy call chaining.
   */ move(x, y) {
        let relative = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, data = arguments.length > 3 ? arguments[3] : void 0;
        element("M", {
            x: +x,
            y: +y
        }, this.pathElements, this.pos++, relative, data);
        return this;
    }
    /**
   * Use this function to add a new line SVG path element.
   * @param x The x coordinate for the line element.
   * @param y The y coordinate for the line element.
   * @param relative If set to true the line element will be created with relative coordinates (lowercase letter)
   * @param data Any data that should be stored with the element object that will be accessible in pathElement
   * @return The current path object for easy call chaining.
   */ line(x, y) {
        let relative = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, data = arguments.length > 3 ? arguments[3] : void 0;
        element("L", {
            x: +x,
            y: +y
        }, this.pathElements, this.pos++, relative, data);
        return this;
    }
    /**
   * Use this function to add a new curve SVG path element.
   * @param x1 The x coordinate for the first control point of the bezier curve.
   * @param y1 The y coordinate for the first control point of the bezier curve.
   * @param x2 The x coordinate for the second control point of the bezier curve.
   * @param y2 The y coordinate for the second control point of the bezier curve.
   * @param x The x coordinate for the target point of the curve element.
   * @param y The y coordinate for the target point of the curve element.
   * @param relative If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param data Any data that should be stored with the element object that will be accessible in pathElement
   * @return The current path object for easy call chaining.
   */ curve(x1, y1, x2, y2, x, y) {
        let relative = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : false, data = arguments.length > 7 ? arguments[7] : void 0;
        element("C", {
            x1: +x1,
            y1: +y1,
            x2: +x2,
            y2: +y2,
            x: +x,
            y: +y
        }, this.pathElements, this.pos++, relative, data);
        return this;
    }
    /**
   * Use this function to add a new non-bezier curve SVG path element.
   * @param rx The radius to be used for the x-axis of the arc.
   * @param ry The radius to be used for the y-axis of the arc.
   * @param xAr Defines the orientation of the arc
   * @param lAf Large arc flag
   * @param sf Sweep flag
   * @param x The x coordinate for the target point of the curve element.
   * @param y The y coordinate for the target point of the curve element.
   * @param relative If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param data Any data that should be stored with the element object that will be accessible in pathElement
   * @return The current path object for easy call chaining.
   */ arc(rx, ry, xAr, lAf, sf, x, y) {
        let relative = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : false, data = arguments.length > 8 ? arguments[8] : void 0;
        element("A", {
            rx,
            ry,
            xAr,
            lAf,
            sf,
            x,
            y
        }, this.pathElements, this.pos++, relative, data);
        return this;
    }
    /**
   * Parses an SVG path seen in the d attribute of path elements, and inserts the parsed elements into the existing path object at the current cursor position. Any closing path indicators (Z at the end of the path) will be ignored by the parser as this is provided by the close option in the options of the path object.
   * @param path Any SVG path that contains move (m), line (l) or curve (c) components.
   * @return The current path object for easy call chaining.
   */ parse(path) {
        // Parsing the SVG path string into an array of arrays [['M', '10', '10'], ['L', '100', '100']]
        const chunks = path.replace(/([A-Za-z])([0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/).reduce((result, pathElement)=>{
            if (pathElement.match(/[A-Za-z]/)) {
                result.push([]);
            }
            result[result.length - 1].push(pathElement);
            return result;
        }, []);
        // If this is a closed path we remove the Z at the end because this is determined by the close option
        if (chunks[chunks.length - 1][0].toUpperCase() === "Z") {
            chunks.pop();
        }
        // Using svgPathElementDescriptions to map raw path arrays into objects that contain the command and the parameters
        // For example {command: 'M', x: '10', y: '10'}
        const elements = chunks.map((chunk)=>{
            const command = chunk.shift();
            const description = elementDescriptions[command.toLowerCase()];
            return {
                command,
                ...description.reduce((result, paramName, index)=>{
                    result[paramName] = +chunk[index];
                    return result;
                }, {})
            };
        });
        // Preparing a splice call with the elements array as var arg params and insert the parsed elements at the current position
        this.pathElements.splice(this.pos, 0, ...elements);
        // Increase the internal position by the element count
        this.pos += elements.length;
        return this;
    }
    /**
   * This function renders to current SVG path object into a final SVG string that can be used in the d attribute of SVG path elements. It uses the accuracy option to round big decimals. If the close parameter was set in the constructor of this path object then a path closing Z will be appended to the output string.
   */ stringify() {
        const accuracyMultiplier = Math.pow(10, this.options.accuracy);
        return this.pathElements.reduce((path, pathElement)=>{
            const params = elementDescriptions[pathElement.command.toLowerCase()].map((paramName)=>{
                const value = pathElement[paramName];
                return this.options.accuracy ? Math.round(value * accuracyMultiplier) / accuracyMultiplier : value;
            });
            return path + pathElement.command + params.join(",");
        }, "") + (this.close ? "Z" : "");
    }
    /**
   * Scales all elements in the current SVG path object. There is an individual parameter for each coordinate. Scaling will also be done for control points of curves, affecting the given coordinate.
   * @param x The number which will be used to scale the x, x1 and x2 of all path elements.
   * @param y The number which will be used to scale the y, y1 and y2 of all path elements.
   * @return The current path object for easy call chaining.
   */ scale(x, y) {
        forEachParam(this.pathElements, (pathElement, paramName)=>{
            pathElement[paramName] *= paramName[0] === "x" ? x : y;
        });
        return this;
    }
    /**
   * Translates all elements in the current SVG path object. The translation is relative and there is an individual parameter for each coordinate. Translation will also be done for control points of curves, affecting the given coordinate.
   * @param x The number which will be used to translate the x, x1 and x2 of all path elements.
   * @param y The number which will be used to translate the y, y1 and y2 of all path elements.
   * @return The current path object for easy call chaining.
   */ translate(x, y) {
        forEachParam(this.pathElements, (pathElement, paramName)=>{
            pathElement[paramName] += paramName[0] === "x" ? x : y;
        });
        return this;
    }
    /**
   * This function will run over all existing path elements and then loop over their attributes. The callback function will be called for every path element attribute that exists in the current path.
   * The method signature of the callback function looks like this:
   * ```javascript
   * function(pathElement, paramName, pathElementIndex, paramIndex, pathElements)
   * ```
   * If something else than undefined is returned by the callback function, this value will be used to replace the old value. This allows you to build custom transformations of path objects that can't be achieved using the basic transformation functions scale and translate.
   * @param transformFnc The callback function for the transformation. Check the signature in the function description.
   * @return The current path object for easy call chaining.
   */ transform(transformFnc) {
        forEachParam(this.pathElements, (pathElement, paramName, pathElementIndex, paramIndex, pathElements)=>{
            const transformed = transformFnc(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
            if (transformed || transformed === 0) {
                pathElement[paramName] = transformed;
            }
        });
        return this;
    }
    /**
   * This function clones a whole path object with all its properties. This is a deep clone and path element objects will also be cloned.
   * @param close Optional option to set the new cloned path to closed. If not specified or false, the original path close option will be used.
   */ clone() {
        let close = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        const clone = new SvgPath(close || this.close);
        clone.pos = this.pos;
        clone.pathElements = this.pathElements.slice().map((pathElement)=>({
                ...pathElement
            })
        );
        clone.options = {
            ...this.options
        };
        return clone;
    }
    /**
   * Split a Svg.Path object by a specific command in the path chain. The path chain will be split and an array of newly created paths objects will be returned. This is useful if you'd like to split an SVG path by it's move commands, for example, in order to isolate chunks of drawings.
   * @param command The command you'd like to use to split the path
   */ splitByCommand(command) {
        const split = [
            new SvgPath()
        ];
        this.pathElements.forEach((pathElement)=>{
            if (pathElement.command === command.toUpperCase() && split[split.length - 1].pathElements.length !== 0) {
                split.push(new SvgPath());
            }
            split[split.length - 1].pathElements.push(pathElement);
        });
        return split;
    }
    /**
   * Used to construct a new path object.
   * @param close If set to true then this path will be closed when stringified (with a Z at the end)
   * @param options Options object that overrides the default objects. See default options for more details.
   */ constructor(close = false, options){
        this.close = close;
        this.pathElements = [];
        this.pos = 0;
        this.options = {
            ...defaultOptions$3,
            ...options
        };
    }
}

/**
 * This interpolation function does not smooth the path and the result is only containing lines and no curves.
 *
 * @example
 * const chart = new LineChart('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.none({
 *     fillHoles: false
 *   })
 * });
 */ function none(options) {
    const finalOptions = {
        fillHoles: false,
        ...options
    };
    return function noneInterpolation(pathCoordinates, valueData) {
        const path = new SvgPath();
        let hole = true;
        for(let i = 0; i < pathCoordinates.length; i += 2){
            const currX = pathCoordinates[i];
            const currY = pathCoordinates[i + 1];
            const currData = valueData[i / 2];
            if (getMultiValue(currData.value) !== undefined) {
                if (hole) {
                    path.move(currX, currY, false, currData);
                } else {
                    path.line(currX, currY, false, currData);
                }
                hole = false;
            } else if (!finalOptions.fillHoles) {
                hole = true;
            }
        }
        return path;
    };
}

/**
 * Simple smoothing creates horizontal handles that are positioned with a fraction of the length between two data points. You can use the divisor option to specify the amount of smoothing.
 *
 * Simple smoothing can be used instead of `Chartist.Smoothing.cardinal` if you'd like to get rid of the artifacts it produces sometimes. Simple smoothing produces less flowing lines but is accurate by hitting the points and it also doesn't swing below or above the given data point.
 *
 * All smoothing functions within Chartist are factory functions that accept an options parameter. The simple interpolation function accepts one configuration parameter `divisor`, between 1 and ∞, which controls the smoothing characteristics.
 *
 * @example
 * const chart = new LineChart('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.simple({
 *     divisor: 2,
 *     fillHoles: false
 *   })
 * });
 *
 * @param options The options of the simple interpolation factory function.
 */ function simple(options) {
    const finalOptions = {
        divisor: 2,
        fillHoles: false,
        ...options
    };
    const d = 1 / Math.max(1, finalOptions.divisor);
    return function simpleInterpolation(pathCoordinates, valueData) {
        const path = new SvgPath();
        let prevX = 0;
        let prevY = 0;
        let prevData;
        for(let i = 0; i < pathCoordinates.length; i += 2){
            const currX = pathCoordinates[i];
            const currY = pathCoordinates[i + 1];
            const length = (currX - prevX) * d;
            const currData = valueData[i / 2];
            if (currData.value !== undefined) {
                if (prevData === undefined) {
                    path.move(currX, currY, false, currData);
                } else {
                    path.curve(prevX + length, prevY, currX - length, currY, currX, currY, false, currData);
                }
                prevX = currX;
                prevY = currY;
                prevData = currData;
            } else if (!finalOptions.fillHoles) {
                prevX = prevY = 0;
                prevData = undefined;
            }
        }
        return path;
    };
}

/**
 * Step interpolation will cause the line chart to move in steps rather than diagonal or smoothed lines. This interpolation will create additional points that will also be drawn when the `showPoint` option is enabled.
 *
 * All smoothing functions within Chartist are factory functions that accept an options parameter. The step interpolation function accepts one configuration parameter `postpone`, that can be `true` or `false`. The default value is `true` and will cause the step to occur where the value actually changes. If a different behaviour is needed where the step is shifted to the left and happens before the actual value, this option can be set to `false`.
 *
 * @example
 * var chart = new Chartist.Line('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.step({
 *     postpone: true,
 *     fillHoles: false
 *   })
 * });
 */ function step(options) {
    const finalOptions = {
        postpone: true,
        fillHoles: false,
        ...options
    };
    return function stepInterpolation(pathCoordinates, valueData) {
        const path = new SvgPath();
        let prevX = 0;
        let prevY = 0;
        let prevData;
        for(let i = 0; i < pathCoordinates.length; i += 2){
            const currX = pathCoordinates[i];
            const currY = pathCoordinates[i + 1];
            const currData = valueData[i / 2];
            // If the current point is also not a hole we can draw the step lines
            if (currData.value !== undefined) {
                if (prevData === undefined) {
                    path.move(currX, currY, false, currData);
                } else {
                    if (finalOptions.postpone) {
                        // If postponed we should draw the step line with the value of the previous value
                        path.line(currX, prevY, false, prevData);
                    } else {
                        // If not postponed we should draw the step line with the value of the current value
                        path.line(prevX, currY, false, currData);
                    }
                    // Line to the actual point (this should only be a Y-Axis movement
                    path.line(currX, currY, false, currData);
                }
                prevX = currX;
                prevY = currY;
                prevData = currData;
            } else if (!finalOptions.fillHoles) {
                prevX = prevY = 0;
                prevData = undefined;
            }
        }
        return path;
    };
}

/**
 * Cardinal / Catmull-Rome spline interpolation is the default smoothing function in Chartist. It produces nice results where the splines will always meet the points. It produces some artifacts though when data values are increased or decreased rapidly. The line may not follow a very accurate path and if the line should be accurate this smoothing function does not produce the best results.
 *
 * Cardinal splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
 *
 * All smoothing functions within Chartist are factory functions that accept an options parameter. The cardinal interpolation function accepts one configuration parameter `tension`, between 0 and 1, which controls the smoothing intensity.
 *
 * @example
 * const chart = new LineChart('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.cardinal({
 *     tension: 1,
 *     fillHoles: false
 *   })
 * });
 *
 * @param options The options of the cardinal factory function.
 */ function cardinal(options) {
    const finalOptions = {
        tension: 1,
        fillHoles: false,
        ...options
    };
    const t = Math.min(1, Math.max(0, finalOptions.tension));
    const c = 1 - t;
    return function cardinalInterpolation(pathCoordinates, valueData) {
        // First we try to split the coordinates into segments
        // This is necessary to treat "holes" in line charts
        const segments = splitIntoSegments(pathCoordinates, valueData, {
            fillHoles: finalOptions.fillHoles
        });
        if (!segments.length) {
            // If there were no segments return 'none' interpolation
            return none()([], []);
        } else if (segments.length > 1) {
            // If the split resulted in more that one segment we need to interpolate each segment individually and join them
            // afterwards together into a single path.
            // For each segment we will recurse the cardinal function
            // Join the segment path data into a single path and return
            return SvgPath.join(segments.map((segment)=>cardinalInterpolation(segment.pathCoordinates, segment.valueData)
            ));
        } else {
            // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
            // segment
            pathCoordinates = segments[0].pathCoordinates;
            valueData = segments[0].valueData;
            // If less than two points we need to fallback to no smoothing
            if (pathCoordinates.length <= 4) {
                return none()(pathCoordinates, valueData);
            }
            const path = new SvgPath().move(pathCoordinates[0], pathCoordinates[1], false, valueData[0]);
            const z = false;
            for(let i = 0, iLen = pathCoordinates.length; iLen - 2 * Number(!z) > i; i += 2){
                const p = [
                    {
                        x: +pathCoordinates[i - 2],
                        y: +pathCoordinates[i - 1]
                    },
                    {
                        x: +pathCoordinates[i],
                        y: +pathCoordinates[i + 1]
                    },
                    {
                        x: +pathCoordinates[i + 2],
                        y: +pathCoordinates[i + 3]
                    },
                    {
                        x: +pathCoordinates[i + 4],
                        y: +pathCoordinates[i + 5]
                    }
                ];
                {
                    if (iLen - 4 === i) {
                        p[3] = p[2];
                    } else if (!i) {
                        p[0] = {
                            x: +pathCoordinates[i],
                            y: +pathCoordinates[i + 1]
                        };
                    }
                }
                path.curve(t * (-p[0].x + 6 * p[1].x + p[2].x) / 6 + c * p[2].x, t * (-p[0].y + 6 * p[1].y + p[2].y) / 6 + c * p[2].y, t * (p[1].x + 6 * p[2].x - p[3].x) / 6 + c * p[2].x, t * (p[1].y + 6 * p[2].y - p[3].y) / 6 + c * p[2].y, p[2].x, p[2].y, false, valueData[(i + 2) / 2]);
            }
            return path;
        }
    };
}

/**
 * Monotone Cubic spline interpolation produces a smooth curve which preserves monotonicity. Unlike cardinal splines, the curve will not extend beyond the range of y-values of the original data points.
 *
 * Monotone Cubic splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
 *
 * The x-values of subsequent points must be increasing to fit a Monotone Cubic spline. If this condition is not met for a pair of adjacent points, then there will be a break in the curve between those data points.
 *
 * All smoothing functions within Chartist are factory functions that accept an options parameter.
 *
 * @example
 * const chart = new LineChart('.ct-chart', {
 *   labels: [1, 2, 3, 4, 5],
 *   series: [[1, 2, 8, 1, 7]]
 * }, {
 *   lineSmooth: Interpolation.monotoneCubic({
 *     fillHoles: false
 *   })
 * });
 *
 * @param options The options of the monotoneCubic factory function.
 */ function monotoneCubic(options) {
    const finalOptions = {
        fillHoles: false,
        ...options
    };
    return function monotoneCubicInterpolation(pathCoordinates, valueData) {
        // First we try to split the coordinates into segments
        // This is necessary to treat "holes" in line charts
        const segments = splitIntoSegments(pathCoordinates, valueData, {
            fillHoles: finalOptions.fillHoles,
            increasingX: true
        });
        if (!segments.length) {
            // If there were no segments return 'Chartist.Interpolation.none'
            return none()([], []);
        } else if (segments.length > 1) {
            // If the split resulted in more that one segment we need to interpolate each segment individually and join them
            // afterwards together into a single path.
            // For each segment we will recurse the monotoneCubic fn function
            // Join the segment path data into a single path and return
            return SvgPath.join(segments.map((segment)=>monotoneCubicInterpolation(segment.pathCoordinates, segment.valueData)
            ));
        } else {
            // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
            // segment
            pathCoordinates = segments[0].pathCoordinates;
            valueData = segments[0].valueData;
            // If less than three points we need to fallback to no smoothing
            if (pathCoordinates.length <= 4) {
                return none()(pathCoordinates, valueData);
            }
            const xs = [];
            const ys = [];
            const n = pathCoordinates.length / 2;
            const ms = [];
            const ds = [];
            const dys = [];
            const dxs = [];
            // Populate x and y coordinates into separate arrays, for readability
            for(let i = 0; i < n; i++){
                xs[i] = pathCoordinates[i * 2];
                ys[i] = pathCoordinates[i * 2 + 1];
            }
            // Calculate deltas and derivative
            for(let i1 = 0; i1 < n - 1; i1++){
                dys[i1] = ys[i1 + 1] - ys[i1];
                dxs[i1] = xs[i1 + 1] - xs[i1];
                ds[i1] = dys[i1] / dxs[i1];
            }
            // Determine desired slope (m) at each point using Fritsch-Carlson method
            // See: http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation
            ms[0] = ds[0];
            ms[n - 1] = ds[n - 2];
            for(let i2 = 1; i2 < n - 1; i2++){
                if (ds[i2] === 0 || ds[i2 - 1] === 0 || ds[i2 - 1] > 0 !== ds[i2] > 0) {
                    ms[i2] = 0;
                } else {
                    ms[i2] = 3 * (dxs[i2 - 1] + dxs[i2]) / ((2 * dxs[i2] + dxs[i2 - 1]) / ds[i2 - 1] + (dxs[i2] + 2 * dxs[i2 - 1]) / ds[i2]);
                    if (!isFinite(ms[i2])) {
                        ms[i2] = 0;
                    }
                }
            }
            // Now build a path from the slopes
            const path = new SvgPath().move(xs[0], ys[0], false, valueData[0]);
            for(let i3 = 0; i3 < n - 1; i3++){
                path.curve(// First control point
                xs[i3] + dxs[i3] / 3, ys[i3] + ms[i3] * dxs[i3] / 3, // Second control point
                xs[i3 + 1] - dxs[i3] / 3, ys[i3 + 1] - ms[i3 + 1] * dxs[i3] / 3, // End point
                xs[i3 + 1], ys[i3 + 1], false, valueData[i3 + 1]);
            }
            return path;
        }
    };
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  none: none,
  simple: simple,
  step: step,
  cardinal: cardinal,
  monotoneCubic: monotoneCubic
});

class EventEmitter {
    on(event, listener) {
        const { allListeners , listeners  } = this;
        if (event === "*") {
            allListeners.add(listener);
        } else {
            if (!listeners.has(event)) {
                listeners.set(event, new Set());
            }
            listeners.get(event).add(listener);
        }
    }
    off(event, listener) {
        const { allListeners , listeners  } = this;
        if (event === "*") {
            if (listener) {
                allListeners.delete(listener);
            } else {
                allListeners.clear();
            }
        } else if (listeners.has(event)) {
            const eventListeners = listeners.get(event);
            if (listener) {
                eventListeners.delete(listener);
            } else {
                eventListeners.clear();
            }
            if (!eventListeners.size) {
                listeners.delete(event);
            }
        }
    }
    /**
   * Use this function to emit an event. All handlers that are listening for this event will be triggered with the data parameter.
   * @param event The event name that should be triggered
   * @param data Arbitrary data that will be passed to the event handler callback functions
   */ emit(event, data) {
        const { allListeners , listeners  } = this;
        // Only do something if there are event handlers with this name existing
        if (listeners.has(event)) {
            listeners.get(event).forEach((listener)=>listener(data)
            );
        }
        // Emit event to star event handlers
        allListeners.forEach((listener)=>listener(event, data)
        );
    }
    constructor(){
        this.listeners = new Map();
        this.allListeners = new Set();
    }
}

const instances = new WeakMap();
class BaseChart {
    // TODO: Currently we need to re-draw the chart on window resize. This is usually very bad and will affect performance.
    // This is done because we can't work with relative coordinates when drawing the chart because SVG Path does not
    // work with relative positions yet. We need to check if we can do a viewBox hack to switch to percentage.
    // See http://mozilla.6506.n7.nabble.com/Specyfing-paths-with-percentages-unit-td247474.html
    // Update: can be done using the above method tested here: http://codepen.io/gionkunz/pen/KDvLj
    // The problem is with the label offsets that can't be converted into percentage and affecting the chart container
    /**
   * Updates the chart which currently does a full reconstruction of the SVG DOM
   * @param data Optional data you'd like to set for the chart before it will update. If not specified the update method will use the data that is already configured with the chart.
   * @param options Optional options you'd like to add to the previous options for the chart before it will update. If not specified the update method will use the options that have been already configured with the chart.
   * @param override If set to true, the passed options will be used to extend the options that have been configured already. Otherwise the chart default options will be used as the base
   */ update(data, options) {
        let override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        if (data) {
            this.data = data || {};
            this.data.labels = this.data.labels || [];
            this.data.series = this.data.series || [];
            // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
            this.eventEmitter.emit("data", {
                type: "update",
                data: this.data
            });
        }
        if (options) {
            this.options = extend({}, override ? this.options : this.defaultOptions, options);
            // If chartist was not initialized yet, we just set the options and leave the rest to the initialization
            // Otherwise we re-create the optionsProvider at this point
            if (!this.initializeTimeoutId) {
                var ref;
                (ref = this.optionsProvider) === null || ref === void 0 ? void 0 : ref.removeMediaQueryListeners();
                this.optionsProvider = optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
            }
        }
        // Only re-created the chart if it has been initialized yet
        if (!this.initializeTimeoutId && this.optionsProvider) {
            this.createChart(this.optionsProvider.getCurrentOptions());
        }
        // Return a reference to the chart object to chain up calls
        return this;
    }
    /**
   * This method can be called on the API object of each chart and will un-register all event listeners that were added to other components. This currently includes a window.resize listener as well as media query listeners if any responsive options have been provided. Use this function if you need to destroy and recreate Chartist charts dynamically.
   */ detach() {
        // Only detach if initialization already occurred on this chart. If this chart still hasn't initialized (therefore
        // the initializationTimeoutId is still a valid timeout reference, we will clear the timeout
        if (!this.initializeTimeoutId) {
            var ref;
            window.removeEventListener("resize", this.resizeListener);
            (ref = this.optionsProvider) === null || ref === void 0 ? void 0 : ref.removeMediaQueryListeners();
        } else {
            window.clearTimeout(this.initializeTimeoutId);
        }
        instances.delete(this.container);
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event, listener) {
        this.eventEmitter.on(event, listener);
        return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(event, listener) {
        this.eventEmitter.off(event, listener);
        return this;
    }
    initialize() {
        // Add window resize listener that re-creates the chart
        window.addEventListener("resize", this.resizeListener);
        // Obtain current options based on matching media queries (if responsive options are given)
        // This will also register a listener that is re-creating the chart based on media changes
        this.optionsProvider = optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
        // Register options change listener that will trigger a chart update
        this.eventEmitter.on("optionsChanged", ()=>this.update()
        );
        // Before the first chart creation we need to register us with all plugins that are configured
        // Initialize all relevant plugins with our chart object and the plugin options specified in the config
        if (this.options.plugins) {
            this.options.plugins.forEach((plugin)=>{
                if (Array.isArray(plugin)) {
                    plugin[0](this, plugin[1]);
                } else {
                    plugin(this);
                }
            });
        }
        // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
        this.eventEmitter.emit("data", {
            type: "initial",
            data: this.data
        });
        // Create the first chart
        this.createChart(this.optionsProvider.getCurrentOptions());
        // As chart is initialized from the event loop now we can reset our timeout reference
        // This is important if the chart gets initialized on the same element twice
        this.initializeTimeoutId = null;
    }
    constructor(query, data, defaultOptions, options, responsiveOptions){
        this.data = data;
        this.defaultOptions = defaultOptions;
        this.options = options;
        this.responsiveOptions = responsiveOptions;
        this.eventEmitter = new EventEmitter();
        this.resizeListener = ()=>this.update()
        ;
        this.initializeTimeoutId = setTimeout(()=>this.initialize()
        , 0);
        const container = typeof query === "string" ? document.querySelector(query) : query;
        if (!container) {
            throw new Error("Target element is not found");
        }
        this.container = container;
        const prevInstance = instances.get(container);
        // If chartist was already initialized in this container we are detaching all event listeners first
        if (prevInstance) {
            prevInstance.detach();
        }
        instances.set(container, this);
    }
}

const axisUnits = {
    x: {
        pos: "x",
        len: "width",
        dir: "horizontal",
        rectStart: "x1",
        rectEnd: "x2",
        rectOffset: "y2"
    },
    y: {
        pos: "y",
        len: "height",
        dir: "vertical",
        rectStart: "y2",
        rectEnd: "y1",
        rectOffset: "x1"
    }
};
class Axis {
    createGridAndLabels(gridGroup, labelGroup, chartOptions, eventEmitter) {
        const axisOptions = this.units.pos === "x" ? chartOptions.axisX : chartOptions.axisY;
        const projectedValues = this.ticks.map((tick, i)=>this.projectValue(tick, i)
        );
        const labelValues = this.ticks.map(axisOptions.labelInterpolationFnc);
        projectedValues.forEach((projectedValue, index)=>{
            const labelValue = labelValues[index];
            const labelOffset = {
                x: 0,
                y: 0
            };
            // TODO: Find better solution for solving this problem
            // Calculate how much space we have available for the label
            let labelLength;
            if (projectedValues[index + 1]) {
                // If we still have one label ahead, we can calculate the distance to the next tick / label
                labelLength = projectedValues[index + 1] - projectedValue;
            } else {
                // If we don't have a label ahead and we have only two labels in total, we just take the remaining distance to
                // on the whole axis length. We limit that to a minimum of 30 pixel, so that labels close to the border will
                // still be visible inside of the chart padding.
                labelLength = Math.max(this.axisLength - projectedValue, 30);
            }
            // Skip grid lines and labels where interpolated label values are falsey (except for 0)
            if (labelValue !== "" && isFalseyButZero(labelValue)) {
                return;
            }
            // Transform to global coordinates using the chartRect
            // We also need to set the label offset for the createLabel function
            if (this.units.pos === "x") {
                projectedValue = this.chartRect.x1 + projectedValue;
                labelOffset.x = chartOptions.axisX.labelOffset.x;
                // If the labels should be positioned in start position (top side for vertical axis) we need to set a
                // different offset as for positioned with end (bottom)
                if (chartOptions.axisX.position === "start") {
                    labelOffset.y = this.chartRect.padding.top + chartOptions.axisX.labelOffset.y + 5;
                } else {
                    labelOffset.y = this.chartRect.y1 + chartOptions.axisX.labelOffset.y + 5;
                }
            } else {
                projectedValue = this.chartRect.y1 - projectedValue;
                labelOffset.y = chartOptions.axisY.labelOffset.y - labelLength;
                // If the labels should be positioned in start position (left side for horizontal axis) we need to set a
                // different offset as for positioned with end (right side)
                if (chartOptions.axisY.position === "start") {
                    labelOffset.x = this.chartRect.padding.left + chartOptions.axisY.labelOffset.x;
                } else {
                    labelOffset.x = this.chartRect.x2 + chartOptions.axisY.labelOffset.x + 10;
                }
            }
            if (axisOptions.showGrid) {
                createGrid(projectedValue, index, this, this.gridOffset, this.chartRect[this.counterUnits.len](), gridGroup, [
                    chartOptions.classNames.grid,
                    chartOptions.classNames[this.units.dir]
                ], eventEmitter);
            }
            if (axisOptions.showLabel) {
                createLabel(projectedValue, labelLength, index, labelValue, this, axisOptions.offset, labelOffset, labelGroup, [
                    chartOptions.classNames.label,
                    chartOptions.classNames[this.units.dir],
                    axisOptions.position === "start" ? chartOptions.classNames[axisOptions.position] : chartOptions.classNames.end
                ], eventEmitter);
            }
        });
    }
    constructor(units, chartRect, ticks){
        this.units = units;
        this.chartRect = chartRect;
        this.ticks = ticks;
        this.counterUnits = units === axisUnits.x ? axisUnits.y : axisUnits.x;
        this.axisLength = chartRect[this.units.rectEnd] - chartRect[this.units.rectStart];
        this.gridOffset = chartRect[this.units.rectOffset];
    }
}

class AutoScaleAxis extends Axis {
    projectValue(value) {
        const finalValue = Number(getMultiValue(value, this.units.pos));
        return this.axisLength * (finalValue - this.bounds.min) / this.bounds.range;
    }
    constructor(axisUnit, data, chartRect, options){
        // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options
        const highLow = options.highLow || getHighLow(data, options, axisUnit.pos);
        const bounds = getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
        const range = {
            min: bounds.min,
            max: bounds.max
        };
        super(axisUnit, chartRect, bounds.values);
        this.bounds = bounds;
        this.range = range;
    }
}

class FixedScaleAxis extends Axis {
    projectValue(value) {
        const finalValue = Number(getMultiValue(value, this.units.pos));
        return this.axisLength * (finalValue - this.range.min) / (this.range.max - this.range.min);
    }
    constructor(axisUnit, data, chartRect, options){
        const highLow = options.highLow || getHighLow(data, options, axisUnit.pos);
        const divisor = options.divisor || 1;
        const ticks = (options.ticks || times(divisor).map((_value, index)=>highLow.low + (highLow.high - highLow.low) / divisor * index
        )).sort((a, b)=>Number(a) - Number(b)
        );
        const range = {
            min: highLow.low,
            max: highLow.high
        };
        super(axisUnit, chartRect, ticks);
        this.range = range;
    }
}

class StepAxis extends Axis {
    projectValue(_value, index) {
        return this.stepLength * index;
    }
    constructor(axisUnit, _data, chartRect, options){
        const ticks = options.ticks || [];
        super(axisUnit, chartRect, ticks);
        const calc = Math.max(1, ticks.length - (options.stretch ? 1 : 0));
        this.stepLength = this.axisLength / calc;
        this.stretch = Boolean(options.stretch);
    }
}

function getSeriesOption(series, options, key) {
    var ref;
    if (safeHasProperty(series, "name") && series.name && ((ref = options.series) === null || ref === void 0 ? void 0 : ref[series.name])) {
        const seriesOptions = options === null || options === void 0 ? void 0 : options.series[series.name];
        const value = seriesOptions[key];
        const result = value === undefined ? options[key] : value;
        return result;
    } else {
        return options[key];
    }
}
/**
 * Default options in line charts. Expand the code view to see a detailed list of options with comments.
 */ const defaultOptions$2 = {
    // Options for X-Axis
    axisX: {
        // The offset of the labels to the chart area
        offset: 30,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: "end",
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
            x: 0,
            y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: noop,
        // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
        type: undefined
    },
    // Options for Y-Axis
    axisY: {
        // The offset of the labels to the chart area
        offset: 40,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: "start",
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
            x: 0,
            y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: noop,
        // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
        type: undefined,
        // This value specifies the minimum height in pixel of the scale steps
        scaleMinSpace: 20,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: false
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // If the line should be drawn or not
    showLine: true,
    // If dots should be drawn or not
    showPoint: true,
    // If the line chart should draw an area
    showArea: false,
    // The base for the area chart that will be used to close the area shape (is normally 0)
    areaBase: 0,
    // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
    lineSmooth: true,
    // If the line chart should add a background fill to the .ct-grids group.
    showGridBackground: false,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
        top: 15,
        right: 15,
        bottom: 5,
        left: 10
    },
    // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
    fullWidth: false,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
        chart: "ct-chart-line",
        label: "ct-label",
        labelGroup: "ct-labels",
        series: "ct-series",
        line: "ct-line",
        point: "ct-point",
        area: "ct-area",
        grid: "ct-grid",
        gridGroup: "ct-grids",
        gridBackground: "ct-grid-background",
        vertical: "ct-vertical",
        horizontal: "ct-horizontal",
        start: "ct-start",
        end: "ct-end"
    }
};
class LineChart extends BaseChart {
    /**
   * Creates a new chart
   */ createChart(options) {
        const { data  } = this;
        const normalizedData = normalizeData(data, options.reverseData, true);
        // Create new svg object
        const svg = createSvg(this.container, options.width, options.height, options.classNames.chart);
        this.svg = svg;
        // Create groups for labels, grid and series
        const gridGroup = svg.elem("g").addClass(options.classNames.gridGroup);
        const seriesGroup = svg.elem("g");
        const labelGroup = svg.elem("g").addClass(options.classNames.labelGroup);
        const chartRect = createChartRect(svg, options);
        let axisX;
        let axisY;
        if (options.axisX.type === undefined) {
            axisX = new StepAxis(axisUnits.x, normalizedData.series, chartRect, {
                ...options.axisX,
                ticks: normalizedData.labels,
                stretch: options.fullWidth
            });
        } else {
            // eslint-disable-next-line new-cap
            axisX = new options.axisX.type(axisUnits.x, normalizedData.series, chartRect, options.axisX);
        }
        if (options.axisY.type === undefined) {
            axisY = new AutoScaleAxis(axisUnits.y, normalizedData.series, chartRect, {
                ...options.axisY,
                high: isNumeric(options.high) ? options.high : options.axisY.high,
                low: isNumeric(options.low) ? options.low : options.axisY.low
            });
        } else {
            // eslint-disable-next-line new-cap
            axisY = new options.axisY.type(axisUnits.y, normalizedData.series, chartRect, options.axisY);
        }
        axisX.createGridAndLabels(gridGroup, labelGroup, options, this.eventEmitter);
        axisY.createGridAndLabels(gridGroup, labelGroup, options, this.eventEmitter);
        if (options.showGridBackground) {
            createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
        }
        // Draw the series
        data.series.forEach((series, seriesIndex)=>{
            const seriesElement = seriesGroup.elem("g");
            const seriesName = safeHasProperty(series, "name") && series.name;
            const seriesClassName = safeHasProperty(series, "className") && series.className;
            const seriesMeta = safeHasProperty(series, "meta") ? series.meta : undefined;
            // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
            if (seriesName) {
                seriesElement.attr({
                    "ct:series-name": seriesName
                });
            }
            if (seriesMeta) {
                seriesElement.attr({
                    "ct:meta": serialize(seriesMeta)
                });
            }
            // Use series class from series data or if not set generate one
            seriesElement.addClass([
                options.classNames.series,
                seriesClassName || "".concat(options.classNames.series, "-").concat(alphaNumerate(seriesIndex))
            ].join(" "));
            const pathCoordinates = [];
            const pathData = [];
            normalizedData.series[seriesIndex].forEach((value, valueIndex)=>{
                const p = {
                    x: chartRect.x1 + axisX.projectValue(value, valueIndex, normalizedData.series[seriesIndex]),
                    y: chartRect.y1 - axisY.projectValue(value, valueIndex, normalizedData.series[seriesIndex])
                };
                pathCoordinates.push(p.x, p.y);
                pathData.push({
                    value,
                    valueIndex,
                    meta: getMetaData(series, valueIndex)
                });
            });
            const seriesOptions = {
                lineSmooth: getSeriesOption(series, options, "lineSmooth"),
                showPoint: getSeriesOption(series, options, "showPoint"),
                showLine: getSeriesOption(series, options, "showLine"),
                showArea: getSeriesOption(series, options, "showArea"),
                areaBase: getSeriesOption(series, options, "areaBase")
            };
            let smoothing;
            if (typeof seriesOptions.lineSmooth === "function") {
                smoothing = seriesOptions.lineSmooth;
            } else {
                smoothing = seriesOptions.lineSmooth ? monotoneCubic() : none();
            }
            // Interpolating path where pathData will be used to annotate each path element so we can trace back the original
            // index, value and meta data
            const path = smoothing(pathCoordinates, pathData);
            // If we should show points we need to create them now to avoid secondary loop
            // Points are drawn from the pathElements returned by the interpolation function
            // Small offset for Firefox to render squares correctly
            if (seriesOptions.showPoint) {
                path.pathElements.forEach((pathElement)=>{
                    const { data: pathElementData  } = pathElement;
                    const point = seriesElement.elem("line", {
                        x1: pathElement.x,
                        y1: pathElement.y,
                        x2: pathElement.x + 0.01,
                        y2: pathElement.y
                    }, options.classNames.point);
                    if (pathElementData) {
                        let x;
                        let y;
                        if (safeHasProperty(pathElementData.value, "x")) {
                            x = pathElementData.value.x;
                        }
                        if (safeHasProperty(pathElementData.value, "y")) {
                            y = pathElementData.value.y;
                        }
                        point.attr({
                            "ct:value": [
                                x,
                                y
                            ].filter(isNumeric).join(","),
                            "ct:meta": serialize(pathElementData.meta)
                        });
                    }
                    this.eventEmitter.emit("draw", {
                        type: "point",
                        value: pathElementData === null || pathElementData === void 0 ? void 0 : pathElementData.value,
                        index: (pathElementData === null || pathElementData === void 0 ? void 0 : pathElementData.valueIndex) || 0,
                        meta: pathElementData === null || pathElementData === void 0 ? void 0 : pathElementData.meta,
                        series,
                        seriesIndex,
                        axisX,
                        axisY,
                        group: seriesElement,
                        element: point,
                        x: pathElement.x,
                        y: pathElement.y,
                        chartRect
                    });
                });
            }
            if (seriesOptions.showLine) {
                const line = seriesElement.elem("path", {
                    d: path.stringify()
                }, options.classNames.line, true);
                this.eventEmitter.emit("draw", {
                    type: "line",
                    values: normalizedData.series[seriesIndex],
                    path: path.clone(),
                    chartRect,
                    // TODO: Remove redundant
                    index: seriesIndex,
                    series,
                    seriesIndex,
                    meta: seriesMeta,
                    axisX,
                    axisY,
                    group: seriesElement,
                    element: line
                });
            }
            // Area currently only works with axes that support a range!
            if (seriesOptions.showArea && axisY.range) {
                // If areaBase is outside the chart area (< min or > max) we need to set it respectively so that
                // the area is not drawn outside the chart area.
                const areaBase = Math.max(Math.min(seriesOptions.areaBase, axisY.range.max), axisY.range.min);
                // We project the areaBase value into screen coordinates
                const areaBaseProjected = chartRect.y1 - axisY.projectValue(areaBase);
                // In order to form the area we'll first split the path by move commands so we can chunk it up into segments
                path.splitByCommand("M")// We filter only "solid" segments that contain more than one point. Otherwise there's no need for an area
                .filter((pathSegment)=>pathSegment.pathElements.length > 1
                ).map((solidPathSegments)=>{
                    // Receiving the filtered solid path segments we can now convert those segments into fill areas
                    const firstElement = solidPathSegments.pathElements[0];
                    const lastElement = solidPathSegments.pathElements[solidPathSegments.pathElements.length - 1];
                    // Cloning the solid path segment with closing option and removing the first move command from the clone
                    // We then insert a new move that should start at the area base and draw a straight line up or down
                    // at the end of the path we add an additional straight line to the projected area base value
                    // As the closing option is set our path will be automatically closed
                    return solidPathSegments.clone(true).position(0).remove(1).move(firstElement.x, areaBaseProjected).line(firstElement.x, firstElement.y).position(solidPathSegments.pathElements.length + 1).line(lastElement.x, areaBaseProjected);
                }).forEach((areaPath)=>{
                    // For each of our newly created area paths, we'll now create path elements by stringifying our path objects
                    // and adding the created DOM elements to the correct series group
                    const area = seriesElement.elem("path", {
                        d: areaPath.stringify()
                    }, options.classNames.area, true);
                    // Emit an event for each area that was drawn
                    this.eventEmitter.emit("draw", {
                        type: "area",
                        values: normalizedData.series[seriesIndex],
                        path: areaPath.clone(),
                        series,
                        seriesIndex,
                        axisX,
                        axisY,
                        chartRect,
                        // TODO: Remove redundant
                        index: seriesIndex,
                        group: seriesElement,
                        element: area,
                        meta: seriesMeta
                    });
                });
            }
        });
        this.eventEmitter.emit("created", {
            chartRect,
            axisX,
            axisY,
            svg,
            options
        });
    }
    /**
   * This method creates a new line chart.
   * @param query A selector query string or directly a DOM element
   * @param data The data object that needs to consist of a labels and a series array
   * @param options The options object with options that override the default options. Check the examples for a detailed list.
   * @param responsiveOptions Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return An object which exposes the API for the created chart
   *
   * @example
   * // Create a simple line chart
   * const data = {
   *   // A labels array that can contain any sort of values
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
   *   // Our series array that contains series objects or in this case series data arrays
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // As options we currently only set a static size of 300x200 px
   * const options = {
   *   width: '300px',
   *   height: '200px'
   * };
   *
   * // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
   * new LineChart('.ct-chart', data, options);
   *
   * @example
   * // Use specific interpolation function with configuration from the Chartist.Interpolation module
   *
   * const chart = new LineChart('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [
   *     [1, 1, 8, 1, 7]
   *   ]
   * }, {
   *   lineSmooth: Chartist.Interpolation.cardinal({
   *     tension: 0.2
   *   })
   * });
   *
   * @example
   * // Create a line chart with responsive options
   *
   * const data = {
   *   // A labels array that can contain any sort of values
   *   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
   *   // Our series array that contains series objects or in this case series data arrays
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
   * const responsiveOptions = [
   *   ['screen and (min-width: 641px) and (max-width: 1024px)', {
   *     showPoint: false,
   *     axisX: {
   *       labelInterpolationFnc: function(value) {
   *         // Will return Mon, Tue, Wed etc. on medium screens
   *         return value.slice(0, 3);
   *       }
   *     }
   *   }],
   *   ['screen and (max-width: 640px)', {
   *     showLine: false,
   *     axisX: {
   *       labelInterpolationFnc: function(value) {
   *         // Will return M, T, W etc. on small screens
   *         return value[0];
   *       }
   *     }
   *   }]
   * ];
   *
   * new LineChart('.ct-chart', data, null, responsiveOptions);
   *
   */ constructor(query, data, options, responsiveOptions){
        super(query, data, defaultOptions$2, extend({}, defaultOptions$2, options), responsiveOptions);
        this.data = data;
    }
}

function getSerialSums(series) {
    return serialMap(series, function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return Array.from(args).reduce((prev, curr)=>{
            return {
                x: prev.x + (safeHasProperty(curr, "x") ? curr.x : 0),
                y: prev.y + (safeHasProperty(curr, "y") ? curr.y : 0)
            };
        }, {
            x: 0,
            y: 0
        });
    });
}
/**
 * Default options in bar charts. Expand the code view to see a detailed list of options with comments.
 */ const defaultOptions$1 = {
    // Options for X-Axis
    axisX: {
        // The offset of the chart drawing area to the border of the container
        offset: 30,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: "end",
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
            x: 0,
            y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: noop,
        // This value specifies the minimum width in pixel of the scale steps
        scaleMinSpace: 30,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: false
    },
    // Options for Y-Axis
    axisY: {
        // The offset of the chart drawing area to the border of the container
        offset: 40,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: "start",
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
            x: 0,
            y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: noop,
        // This value specifies the minimum height in pixel of the scale steps
        scaleMinSpace: 20,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: false
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
    referenceValue: 0,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
        top: 15,
        right: 15,
        bottom: 5,
        left: 10
    },
    // Specify the distance in pixel of bars in a group
    seriesBarDistance: 15,
    // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
    stackBars: false,
    // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
    // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
    stackMode: "accumulate",
    // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
    horizontalBars: false,
    // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
    distributeSeries: false,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // If the bar chart should add a background fill to the .ct-grids group.
    showGridBackground: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
        chart: "ct-chart-bar",
        horizontalBars: "ct-horizontal-bars",
        label: "ct-label",
        labelGroup: "ct-labels",
        series: "ct-series",
        bar: "ct-bar",
        grid: "ct-grid",
        gridGroup: "ct-grids",
        gridBackground: "ct-grid-background",
        vertical: "ct-vertical",
        horizontal: "ct-horizontal",
        start: "ct-start",
        end: "ct-end"
    }
};
class BarChart extends BaseChart {
    /**
   * Creates a new chart
   */ createChart(options) {
        const { data  } = this;
        const normalizedData = normalizeData(data, options.reverseData, options.horizontalBars ? "x" : "y", true);
        // Create new svg element
        const svg = createSvg(this.container, options.width, options.height, options.classNames.chart + (options.horizontalBars ? " " + options.classNames.horizontalBars : ""));
        const highLow = options.stackBars && options.stackMode !== true && normalizedData.series.length ? getHighLow([
            getSerialSums(normalizedData.series)
        ], options, options.horizontalBars ? "x" : "y") : getHighLow(normalizedData.series, options, options.horizontalBars ? "x" : "y");
        this.svg = svg;
        // Drawing groups in correct order
        const gridGroup = svg.elem("g").addClass(options.classNames.gridGroup);
        const seriesGroup = svg.elem("g");
        const labelGroup = svg.elem("g").addClass(options.classNames.labelGroup);
        // Overrides of high / low from settings
        if (typeof options.high === "number") {
            highLow.high = options.high;
        }
        if (typeof options.low === "number") {
            highLow.low = options.low;
        }
        const chartRect = createChartRect(svg, options);
        let valueAxis;
        const labelAxisTicks = options.distributeSeries && options.stackBars ? // use only the first label for the step axis
        normalizedData.labels.slice(0, 1) : // If we are drawing a regular bar chart with two dimensional series data, we just use the labels array
        // as the bars are normalized
        normalizedData.labels;
        let labelAxis;
        let axisX;
        let axisY;
        // Set labelAxis and valueAxis based on the horizontalBars setting. This setting will flip the axes if necessary.
        if (options.horizontalBars) {
            if (options.axisX.type === undefined) {
                valueAxis = axisX = new AutoScaleAxis(axisUnits.x, normalizedData.series, chartRect, {
                    ...options.axisX,
                    highLow: highLow,
                    referenceValue: 0
                });
            } else {
                // eslint-disable-next-line new-cap
                valueAxis = axisX = new options.axisX.type(axisUnits.x, normalizedData.series, chartRect, {
                    ...options.axisX,
                    highLow: highLow,
                    referenceValue: 0
                });
            }
            if (options.axisY.type === undefined) {
                labelAxis = axisY = new StepAxis(axisUnits.y, normalizedData.series, chartRect, {
                    ticks: labelAxisTicks
                });
            } else {
                // eslint-disable-next-line new-cap
                labelAxis = axisY = new options.axisY.type(axisUnits.y, normalizedData.series, chartRect, options.axisY);
            }
        } else {
            if (options.axisX.type === undefined) {
                labelAxis = axisX = new StepAxis(axisUnits.x, normalizedData.series, chartRect, {
                    ticks: labelAxisTicks
                });
            } else {
                // eslint-disable-next-line new-cap
                labelAxis = axisX = new options.axisX.type(axisUnits.x, normalizedData.series, chartRect, options.axisX);
            }
            if (options.axisY.type === undefined) {
                valueAxis = axisY = new AutoScaleAxis(axisUnits.y, normalizedData.series, chartRect, {
                    ...options.axisY,
                    highLow: highLow,
                    referenceValue: 0
                });
            } else {
                // eslint-disable-next-line new-cap
                valueAxis = axisY = new options.axisY.type(axisUnits.y, normalizedData.series, chartRect, {
                    ...options.axisY,
                    highLow: highLow,
                    referenceValue: 0
                });
            }
        }
        // Projected 0 point
        const zeroPoint = options.horizontalBars ? chartRect.x1 + valueAxis.projectValue(0) : chartRect.y1 - valueAxis.projectValue(0);
        // Used to track the screen coordinates of stacked bars
        const stackedBarValues = [];
        labelAxis.createGridAndLabels(gridGroup, labelGroup, options, this.eventEmitter);
        valueAxis.createGridAndLabels(gridGroup, labelGroup, options, this.eventEmitter);
        if (options.showGridBackground) {
            createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
        }
        // Draw the series
        data.series.forEach((series, seriesIndex)=>{
            // Calculating bi-polar value of index for seriesOffset. For i = 0..4 biPol will be -1.5, -0.5, 0.5, 1.5 etc.
            const biPol = seriesIndex - (data.series.length - 1) / 2;
            // Half of the period width between vertical grid lines used to position bars
            let periodHalfLength;
            // We need to set periodHalfLength based on some options combinations
            if (options.distributeSeries && !options.stackBars) {
                // If distributed series are enabled but stacked bars aren't, we need to use the length of the normaizedData array
                // which is the series count and divide by 2
                periodHalfLength = labelAxis.axisLength / normalizedData.series.length / 2;
            } else if (options.distributeSeries && options.stackBars) {
                // If distributed series and stacked bars are enabled we'll only get one bar so we should just divide the axis
                // length by 2
                periodHalfLength = labelAxis.axisLength / 2;
            } else {
                // On regular bar charts we should just use the series length
                periodHalfLength = labelAxis.axisLength / normalizedData.series[seriesIndex].length / 2;
            }
            // Adding the series group to the series element
            const seriesElement = seriesGroup.elem("g");
            const seriesName = safeHasProperty(series, "name") && series.name;
            const seriesClassName = safeHasProperty(series, "className") && series.className;
            const seriesMeta = safeHasProperty(series, "meta") ? series.meta : undefined;
            // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
            if (seriesName) {
                seriesElement.attr({
                    "ct:series-name": seriesName
                });
            }
            if (seriesMeta) {
                seriesElement.attr({
                    "ct:meta": serialize(seriesMeta)
                });
            }
            // Use series class from series data or if not set generate one
            seriesElement.addClass([
                options.classNames.series,
                seriesClassName || "".concat(options.classNames.series, "-").concat(alphaNumerate(seriesIndex))
            ].join(" "));
            normalizedData.series[seriesIndex].forEach((value, valueIndex)=>{
                let labelAxisValueIndex;
                // We need to set labelAxisValueIndex based on some options combinations
                if (options.distributeSeries && !options.stackBars) {
                    // If distributed series are enabled but stacked bars aren't, we can use the seriesIndex for later projection
                    // on the step axis for label positioning
                    labelAxisValueIndex = seriesIndex;
                } else if (options.distributeSeries && options.stackBars) {
                    // If distributed series and stacked bars are enabled, we will only get one bar and therefore always use
                    // 0 for projection on the label step axis
                    labelAxisValueIndex = 0;
                } else {
                    // On regular bar charts we just use the value index to project on the label step axis
                    labelAxisValueIndex = valueIndex;
                }
                let projected;
                // We need to transform coordinates differently based on the chart layout
                if (options.horizontalBars) {
                    projected = {
                        x: chartRect.x1 + valueAxis.projectValue(safeHasProperty(value, "x") ? value.x : 0, valueIndex, normalizedData.series[seriesIndex]),
                        y: chartRect.y1 - labelAxis.projectValue(safeHasProperty(value, "y") ? value.y : 0, labelAxisValueIndex, normalizedData.series[seriesIndex])
                    };
                } else {
                    projected = {
                        x: chartRect.x1 + labelAxis.projectValue(safeHasProperty(value, "x") ? value.x : 0, labelAxisValueIndex, normalizedData.series[seriesIndex]),
                        y: chartRect.y1 - valueAxis.projectValue(safeHasProperty(value, "y") ? value.y : 0, valueIndex, normalizedData.series[seriesIndex])
                    };
                }
                // If the label axis is a step based axis we will offset the bar into the middle of between two steps using
                // the periodHalfLength value. Also we do arrange the different series so that they align up to each other using
                // the seriesBarDistance. If we don't have a step axis, the bar positions can be chosen freely so we should not
                // add any automated positioning.
                if (labelAxis instanceof StepAxis) {
                    // Offset to center bar between grid lines, but only if the step axis is not stretched
                    if (!labelAxis.stretch) {
                        projected[labelAxis.units.pos] += periodHalfLength * (options.horizontalBars ? -1 : 1);
                    }
                    // Using bi-polar offset for multiple series if no stacked bars or series distribution is used
                    projected[labelAxis.units.pos] += options.stackBars || options.distributeSeries ? 0 : biPol * options.seriesBarDistance * (options.horizontalBars ? -1 : 1);
                }
                // Enter value in stacked bar values used to remember previous screen value for stacking up bars
                const previousStack = stackedBarValues[valueIndex] || zeroPoint;
                stackedBarValues[valueIndex] = previousStack - (zeroPoint - projected[labelAxis.counterUnits.pos]);
                // Skip if value is undefined
                if (value === undefined) {
                    return;
                }
                const positions = {
                    ["".concat(labelAxis.units.pos, "1")]: projected[labelAxis.units.pos],
                    ["".concat(labelAxis.units.pos, "2")]: projected[labelAxis.units.pos]
                };
                if (options.stackBars && (options.stackMode === "accumulate" || !options.stackMode)) {
                    // Stack mode: accumulate (default)
                    // If bars are stacked we use the stackedBarValues reference and otherwise base all bars off the zero line
                    // We want backwards compatibility, so the expected fallback without the 'stackMode' option
                    // to be the original behaviour (accumulate)
                    positions["".concat(labelAxis.counterUnits.pos, "1")] = previousStack;
                    positions["".concat(labelAxis.counterUnits.pos, "2")] = stackedBarValues[valueIndex];
                } else {
                    // Draw from the zero line normally
                    // This is also the same code for Stack mode: overlap
                    positions["".concat(labelAxis.counterUnits.pos, "1")] = zeroPoint;
                    positions["".concat(labelAxis.counterUnits.pos, "2")] = projected[labelAxis.counterUnits.pos];
                }
                // Limit x and y so that they are within the chart rect
                positions.x1 = Math.min(Math.max(positions.x1, chartRect.x1), chartRect.x2);
                positions.x2 = Math.min(Math.max(positions.x2, chartRect.x1), chartRect.x2);
                positions.y1 = Math.min(Math.max(positions.y1, chartRect.y2), chartRect.y1);
                positions.y2 = Math.min(Math.max(positions.y2, chartRect.y2), chartRect.y1);
                const metaData = getMetaData(series, valueIndex);
                // Create bar element
                const bar = seriesElement.elem("line", positions, options.classNames.bar).attr({
                    "ct:value": [
                        safeHasProperty(value, "x") && value.x,
                        safeHasProperty(value, "y") && value.y
                    ].filter(isNumeric).join(","),
                    "ct:meta": serialize(metaData)
                });
                this.eventEmitter.emit("draw", {
                    type: "bar",
                    value,
                    index: valueIndex,
                    meta: metaData,
                    series,
                    seriesIndex,
                    axisX,
                    axisY,
                    chartRect,
                    group: seriesElement,
                    element: bar,
                    ...positions
                });
            });
        });
        this.eventEmitter.emit("created", {
            chartRect,
            axisX,
            axisY,
            svg,
            options
        });
    }
    /**
   * This method creates a new bar chart and returns API object that you can use for later changes.
   * @param query A selector query string or directly a DOM element
   * @param data The data object that needs to consist of a labels and a series array
   * @param options The options object with options that override the default options. Check the examples for a detailed list.
   * @param responsiveOptions Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return An object which exposes the API for the created chart
   *
   * @example
   * // Create a simple bar chart
   * const data = {
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // In the global name space Chartist we call the Bar function to initialize a bar chart. As a first parameter we pass in a selector where we would like to get our chart created and as a second parameter we pass our data object.
   * new BarChart('.ct-chart', data);
   *
   * @example
   * // This example creates a bipolar grouped bar chart where the boundaries are limitted to -10 and 10
   * new BarChart('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5, 6, 7],
   *   series: [
   *     [1, 3, 2, -5, -3, 1, -6],
   *     [-5, -2, -4, -1, 2, -3, 1]
   *   ]
   * }, {
   *   seriesBarDistance: 12,
   *   low: -10,
   *   high: 10
   * });
   *
   */ constructor(query, data, options, responsiveOptions){
        super(query, data, defaultOptions$1, extend({}, defaultOptions$1, options), responsiveOptions);
        this.data = data;
    }
}

/**
 * Default options in line charts. Expand the code view to see a detailed list of options with comments.
 */ const defaultOptions = {
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: 5,
    // Override the class names that are used to generate the SVG structure of the chart
    classNames: {
        chartPie: "ct-chart-pie",
        chartDonut: "ct-chart-donut",
        series: "ct-series",
        slicePie: "ct-slice-pie",
        sliceDonut: "ct-slice-donut",
        label: "ct-label"
    },
    // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
    startAngle: 0,
    // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
    total: undefined,
    // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
    donut: false,
    // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
    // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
    donutWidth: 60,
    // If a label should be shown or not
    showLabel: true,
    // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
    labelOffset: 0,
    // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
    labelPosition: "inside",
    // An interpolation function for the label value
    labelInterpolationFnc: noop,
    // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
    labelDirection: "neutral",
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // If true empty values will be ignored to avoid drawing unnecessary slices and labels
    ignoreEmptyValues: false
};
/**
 * Determines SVG anchor position based on direction and center parameter
 */ function determineAnchorPosition(center, label, direction) {
    const toTheRight = label.x > center.x;
    if (toTheRight && direction === "explode" || !toTheRight && direction === "implode") {
        return "start";
    } else if (toTheRight && direction === "implode" || !toTheRight && direction === "explode") {
        return "end";
    } else {
        return "middle";
    }
}
class PieChart extends BaseChart {
    /**
   * Creates the pie chart
   *
   * @param options
   */ createChart(options) {
        const { data  } = this;
        const normalizedData = normalizeData(data);
        const seriesGroups = [];
        let labelsGroup;
        let labelRadius;
        let startAngle = options.startAngle;
        // Create SVG.js draw
        const svg = createSvg(this.container, options.width, options.height, options.donut ? options.classNames.chartDonut : options.classNames.chartPie);
        this.svg = svg;
        // Calculate charting rect
        const chartRect = createChartRect(svg, options);
        // Get biggest circle radius possible within chartRect
        let radius = Math.min(chartRect.width() / 2, chartRect.height() / 2);
        // Calculate total of all series to get reference value or use total reference from optional options
        const totalDataSum = options.total || normalizedData.series.reduce(sum, 0);
        const donutWidth = quantity(options.donutWidth);
        if (donutWidth.unit === "%") {
            donutWidth.value *= radius / 100;
        }
        // If this is a donut chart we need to adjust our radius to enable strokes to be drawn inside
        // Unfortunately this is not possible with the current SVG Spec
        // See this proposal for more details: http://lists.w3.org/Archives/Public/www-svg/2003Oct/0000.html
        radius -= options.donut ? donutWidth.value / 2 : 0;
        // If labelPosition is set to `outside` or a donut chart is drawn then the label position is at the radius,
        // if regular pie chart it's half of the radius
        if (options.labelPosition === "outside" || options.donut) {
            labelRadius = radius;
        } else if (options.labelPosition === "center") {
            // If labelPosition is center we start with 0 and will later wait for the labelOffset
            labelRadius = 0;
        } else {
            // Default option is 'inside' where we use half the radius so the label will be placed in the center of the pie
            // slice
            labelRadius = radius / 2;
        }
        // Add the offset to the labelRadius where a negative offset means closed to the center of the chart
        if (options.labelOffset) {
            labelRadius += options.labelOffset;
        }
        // Calculate end angle based on total sum and current data value and offset with padding
        const center = {
            x: chartRect.x1 + chartRect.width() / 2,
            y: chartRect.y2 + chartRect.height() / 2
        };
        // Check if there is only one non-zero value in the series array.
        const hasSingleValInSeries = data.series.filter((val)=>safeHasProperty(val, "value") ? val.value !== 0 : val !== 0
        ).length === 1;
        // Creating the series groups
        data.series.forEach((_, index)=>seriesGroups[index] = svg.elem("g")
        );
        // if we need to show labels we create the label group now
        if (options.showLabel) {
            labelsGroup = svg.elem("g");
        }
        // Draw the series
        // initialize series groups
        data.series.forEach((series, index)=>{
            var ref, ref1;
            // If current value is zero and we are ignoring empty values then skip to next value
            if (normalizedData.series[index] === 0 && options.ignoreEmptyValues) {
                return;
            }
            const seriesName = safeHasProperty(series, "name") && series.name;
            const seriesClassName = safeHasProperty(series, "className") && series.className;
            const seriesMeta = safeHasProperty(series, "meta") ? series.meta : undefined;
            // If the series is an object and contains a name or meta data we add a custom attribute
            if (seriesName) {
                seriesGroups[index].attr({
                    "ct:series-name": seriesName
                });
            }
            // Use series class from series data or if not set generate one
            seriesGroups[index].addClass([
                (ref = options.classNames) === null || ref === void 0 ? void 0 : ref.series,
                seriesClassName || "".concat((ref1 = options.classNames) === null || ref1 === void 0 ? void 0 : ref1.series, "-").concat(alphaNumerate(index))
            ].join(" "));
            // If the whole dataset is 0 endAngle should be zero. Can't divide by 0.
            let endAngle = totalDataSum > 0 ? startAngle + normalizedData.series[index] / totalDataSum * 360 : 0;
            // Use slight offset so there are no transparent hairline issues
            const overlappigStartAngle = Math.max(0, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));
            // If we need to draw the arc for all 360 degrees we need to add a hack where we close the circle
            // with Z and use 359.99 degrees
            if (endAngle - overlappigStartAngle >= 359.99) {
                endAngle = overlappigStartAngle + 359.99;
            }
            const start = polarToCartesian(center.x, center.y, radius, overlappigStartAngle);
            const end = polarToCartesian(center.x, center.y, radius, endAngle);
            // Create a new path element for the pie chart. If this isn't a donut chart we should close the path for a correct stroke
            const path = new SvgPath(!options.donut).move(end.x, end.y).arc(radius, radius, 0, Number(endAngle - startAngle > 180), 0, start.x, start.y);
            // If regular pie chart (no donut) we add a line to the center of the circle for completing the pie
            if (!options.donut) {
                path.line(center.x, center.y);
            }
            // Create the SVG path
            // If this is a donut chart we add the donut class, otherwise just a regular slice
            const pathElement = seriesGroups[index].elem("path", {
                d: path.stringify()
            }, options.donut ? options.classNames.sliceDonut : options.classNames.slicePie);
            // Adding the pie series value to the path
            pathElement.attr({
                "ct:value": normalizedData.series[index],
                "ct:meta": serialize(seriesMeta)
            });
            // If this is a donut, we add the stroke-width as style attribute
            if (options.donut) {
                pathElement.attr({
                    style: "stroke-width: " + donutWidth.value + "px"
                });
            }
            // Fire off draw event
            this.eventEmitter.emit("draw", {
                type: "slice",
                value: normalizedData.series[index],
                totalDataSum: totalDataSum,
                index,
                meta: seriesMeta,
                series,
                group: seriesGroups[index],
                element: pathElement,
                path: path.clone(),
                center,
                radius,
                startAngle,
                endAngle,
                chartRect
            });
            // If we need to show labels we need to add the label for this slice now
            if (options.showLabel) {
                let labelPosition;
                if (data.series.length === 1) {
                    // If we have only 1 series, we can position the label in the center of the pie
                    labelPosition = {
                        x: center.x,
                        y: center.y
                    };
                } else {
                    // Position at the labelRadius distance from center and between start and end angle
                    labelPosition = polarToCartesian(center.x, center.y, labelRadius, startAngle + (endAngle - startAngle) / 2);
                }
                let rawValue;
                if (normalizedData.labels && !isFalseyButZero(normalizedData.labels[index])) {
                    rawValue = normalizedData.labels[index];
                } else {
                    rawValue = normalizedData.series[index];
                }
                const interpolatedValue = options.labelInterpolationFnc(rawValue, index);
                if (interpolatedValue || interpolatedValue === 0) {
                    const labelElement = labelsGroup.elem("text", {
                        dx: labelPosition.x,
                        dy: labelPosition.y,
                        "text-anchor": determineAnchorPosition(center, labelPosition, options.labelDirection)
                    }, options.classNames.label).text(String(interpolatedValue));
                    // Fire off draw event
                    this.eventEmitter.emit("draw", {
                        type: "label",
                        index,
                        group: labelsGroup,
                        element: labelElement,
                        text: "" + interpolatedValue,
                        chartRect,
                        series,
                        meta: seriesMeta,
                        ...labelPosition
                    });
                }
            }
            // Set next startAngle to current endAngle.
            // (except for last slice)
            startAngle = endAngle;
        });
        this.eventEmitter.emit("created", {
            chartRect,
            svg: svg,
            options
        });
    }
    /**
   * This method creates a new pie chart and returns an object that can be used to redraw the chart.
   * @param query A selector query string or directly a DOM element
   * @param data The data object in the pie chart needs to have a series property with a one dimensional data array. The values will be normalized against each other and don't necessarily need to be in percentage. The series property can also be an array of value objects that contain a value property and a className property to override the CSS class name for the series group.
   * @param options The options object with options that override the default options. Check the examples for a detailed list.
   * @param responsiveOptions Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   *
   * @example
   * // Simple pie chart example with four series
   * new PieChart('.ct-chart', {
   *   series: [10, 2, 4, 3]
   * });
   *
   * @example
   * // Drawing a donut chart
   * new PieChart('.ct-chart', {
   *   series: [10, 2, 4, 3]
   * }, {
   *   donut: true
   * });
   *
   * @example
   * // Using donut, startAngle and total to draw a gauge chart
   * new PieChart('.ct-chart', {
   *   series: [20, 10, 30, 40]
   * }, {
   *   donut: true,
   *   donutWidth: 20,
   *   startAngle: 270,
   *   total: 200
   * });
   *
   * @example
   * // Drawing a pie chart with padding and labels that are outside the pie
   * new PieChart('.ct-chart', {
   *   series: [20, 10, 30, 40]
   * }, {
   *   chartPadding: 30,
   *   labelOffset: 50,
   *   labelDirection: 'explode'
   * });
   *
   * @example
   * // Overriding the class names for individual series as well as a name and meta data.
   * // The name will be written as ct:series-name attribute and the meta data will be serialized and written
   * // to a ct:meta attribute.
   * new PieChart('.ct-chart', {
   *   series: [{
   *     value: 20,
   *     name: 'Series 1',
   *     className: 'my-custom-class-one',
   *     meta: 'Meta One'
   *   }, {
   *     value: 10,
   *     name: 'Series 2',
   *     className: 'my-custom-class-two',
   *     meta: 'Meta Two'
   *   }, {
   *     value: 70,
   *     name: 'Series 3',
   *     className: 'my-custom-class-three',
   *     meta: 'Meta Three'
   *   }]
   * });
   */ constructor(query, data, options, responsiveOptions){
        super(query, data, defaultOptions, extend({}, defaultOptions, options), responsiveOptions);
        this.data = data;
    }
}


//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/demo/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./src/lib/index.ts");
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chartist */ "./node_modules/chartist/dist/index.js");


/**
 * Set up the explanation section including table, graph and stop button
 */

function explanationSection() {
  var _document$getElementB;

  var start_time = new Date().getTime();
  var interval_time = 1000;
  var naive_time = -1000;
  var naiveTickCount = 0;
  var tockTickCount = 0;
  var clockDiffEl = document.getElementById("clockDiff");
  var tockClockEl = document.getElementById("tockClock");
  var tockErrorEl = document.getElementById("tockError");
  var tockTickEl = document.getElementById("tockTick");
  var naiveClockEl = document.getElementById("naiveClock");
  var naiveErrorEl = document.getElementById("naiveError");
  var naiveTickEl = document.getElementById("naiveTick");
  var chartData = {
    labels: [],
    series: [[], []]
  }; // Make a graph using Chartist

  var chart = new chartist__WEBPACK_IMPORTED_MODULE_1__.LineChart(".chart", chartData, {
    height: 400
  }); // Set up a Tock timer for the explanation section

  var graphTimer = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"]({
    interval: interval_time,
    callback: function callback() {
      tockTickCount++;
      tockTickEl.value = tockTickCount.toString();
      tockClockEl.value = graphTimer.msToTimecode(graphTimer.lap(), true);
      tockErrorEl.value = String(new Date().getTime() - start_time - graphTimer.lap());
      chartData.series[0].push(graphTimer.lap());
      chart.update();
    }
  });
  graphTimer.start(); // Set up a naive setInterval timer for the graph

  var interval = window.setInterval(function () {
    naiveTickEl.value = String(naiveTickCount++);
    naive_time += interval_time;
    naiveClockEl.value = graphTimer.msToTimecode(naive_time, true);
    naiveErrorEl.value = String(new Date().getTime() - start_time - naive_time);
    chartData.series[1].push(naive_time);
    chart.update();
  }, interval_time);
  (_document$getElementB = document.getElementById("stopButton")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.addEventListener("click", function () {
    window.clearInterval(interval);
    window.clearInterval(clockDiffInterval);
    graphTimer.stop();
  }); // Update the realtime clock every 16ms

  var clockDiffInterval = window.setInterval(function () {
    var current_time = new Date().getTime();
    clockDiffEl.value = graphTimer.msToTimecode(current_time - start_time, true);
  }, 16);
}
/**
 * Set up a time clock
 */


function timerExample() {
  var timer = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"]({
    callback: function callback() {
      document.getElementById("clockface").value = timer.msToTime(timer.lap());
    }
  });
  document.getElementById("start").addEventListener("click", function () {
    timer.start(document.getElementById("clockface").value);
  });
  document.getElementById("lap").addEventListener("click", function () {
    // Get the time from the timer and convert to a string
    var time = timer.msToTime(timer.lap()); // Append the string to the list

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(time));
    document.getElementById("laptimes").appendChild(li);
  });
  document.getElementById("pause").addEventListener("click", function () {
    timer.pause();
  });
  document.getElementById("stop").addEventListener("click", function () {
    timer.stop();
  });
  document.getElementById("reset").addEventListener("click", function () {
    timer.reset();
    document.getElementById("clockface").value = "";
    document.getElementById("laptimes").innerHTML = "";
    console.log(document.getElementById("laptimes"));
  });
}
/**
 * Set up a countdown timer
 */


function countdownTimerExampld() {
  var countdown = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"]({
    countdown: true,
    interval: 250,
    callback: function callback() {
      document.getElementById("countdown_clock").value = countdown.msToTime(countdown.lap());
    },
    complete: function complete() {
      alert("Time's up!");
    }
  });
  document.getElementById("startCountdown").addEventListener("click", function () {
    countdown.start(document.getElementById("countdown_clock").value);
  });
  document.getElementById("pauseCountdown").addEventListener("click", function () {
    countdown.pause();
  });
  document.getElementById("stopCountdown").addEventListener("click", function () {
    countdown.stop();
  });
  document.getElementById("resetCountdown").addEventListener("click", function () {
    countdown.stop();
    document.getElementById("countdown_clock").value = "00:02";
  });
}

window.onload = function () {
  explanationSection();
  timerExample();
  countdownTimerExampld();
};
})();

/******/ })()
;
//# sourceMappingURL=index.js.map