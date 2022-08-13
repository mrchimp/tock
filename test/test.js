import tock from "../dist/tock.esm.min.js";
import assert from "assert";
import fs from "fs";

const timer = new tock();

describe("Tock", function () {
  describe("timeToMS()", function () {
    it("allow MM:SS, M:SS strings", function () {
      assert.equal(timer.timeToMS("10:00"), 600000);
      assert.equal(timer.timeToMS("01:00"), 60000);
      assert.equal(timer.timeToMS("0:01"), 1000);
    });

    it("allow MM:SS:ms, MM:SS.ms with and without leading zeros", function () {
      assert.equal(timer.timeToMS("10:00:001"), 600001);
      assert.equal(timer.timeToMS("10:00:001"), 600001);
      assert.equal(timer.timeToMS("10:00.001"), 600001);
      assert.equal(timer.timeToMS("10:00.001"), 600001);
      assert.equal(timer.timeToMS("1:00:001"), 60001);
    });

    it("allow HH:MM:SS strings", function () {
      assert.equal(timer.timeToMS("10:10:10"), 36610000);
    });

    it("return integers unchanged", function () {
      assert.equal(timer.timeToMS(30), 30);
    });

    it("default to 0 for unrecognised strings", function () {
      assert.equal(timer.timeToMS("This is not a time string."), 0);
    });
  });

  describe("msToTimecode()", function () {
    it("return a HH:MM:SS string", function () {
      assert.equal(timer.msToTimecode(36610000), "10:10:10");
    });

    it("return a HH:MM:SS:ms string", function () {
      assert.equal(timer.msToTimecode(36610010, true), "10:10:10:010");
    });

    it("return an empty HH:MM:SS string", function () {
      assert.equal(timer.msToTimecode(0), "00:00:00");
    });

    it("return an empty HH:MM:SS:ms string", function () {
      assert.equal(timer.msToTimecode(0, true), "00:00:00:000");
    });

    var hour = 3600000;

    it("return correct time when using large number of hours", function () {
      assert.equal(timer.msToTimecode(50 * hour), "50:00:00");
    });

    it("return correct time when greater than 60 hours", function () {
      assert.equal(timer.msToTimecode(80 * hour), "80:00:00");
    });
  });

  describe("msToTime()", function () {
    it("return a MM:SS.ms string", function () {
      assert.equal(timer.msToTime(600001), "10:00.001");
    });
  });
});
