import Tock from "../lib";
import { LineChart } from "chartist";

/**
 * Set up the explanation section including table, graph and stop button
 */
function explanationSection() {
  const start_time = new Date().getTime();
  const interval_time = 1000;
  let naive_time = -1000;
  let naiveTickCount = 0;
  let tockTickCount = 0;

  const clockDiffEl = document.getElementById("clockDiff");

  const tockClockEl = document.getElementById("tockClock");
  const tockErrorEl = document.getElementById("tockError");
  const tockTickEl = document.getElementById("tockTick");

  const naiveClockEl = document.getElementById("naiveClock");
  const naiveErrorEl = document.getElementById("naiveError");
  const naiveTickEl = document.getElementById("naiveTick");

  const chartData = {
    labels: [],
    series: [[], []],
  };

  // Make a graph using Chartist
  const chart = new LineChart(".chart", chartData, {
    height: 400,
  });

  // Set up a Tock timer for the explanation section
  const graphTimer = new Tock({
    interval: interval_time,
    callback: () => {
      tockTickCount++;
      tockTickEl.value = tockTickCount.toString();

      tockClockEl.value = graphTimer.msToTimecode(graphTimer.lap(), true);
      tockErrorEl.value = String(
        new Date().getTime() - start_time - graphTimer.lap()
      );

      chartData.series[0].push(graphTimer.lap());

      chart.update();
    },
  });

  graphTimer.start();

  // Set up a naive setInterval timer for the graph
  const interval = window.setInterval(() => {
    naiveTickEl.value = String(naiveTickCount++);

    naive_time += interval_time;
    naiveClockEl.value = graphTimer.msToTimecode(naive_time, true);
    naiveErrorEl.value = String(new Date().getTime() - start_time - naive_time);

    chartData.series[1].push(naive_time);
    chart.update();
  }, interval_time);

  document.getElementById("stopButton")?.addEventListener("click", () => {
    window.clearInterval(interval);
    window.clearInterval(clockDiffInterval);
    graphTimer.stop();
  });

  // Update the realtime clock every 16ms
  const clockDiffInterval = window.setInterval(() => {
    const current_time = new Date().getTime();
    clockDiffEl.value = graphTimer.msToTimecode(
      current_time - start_time,
      true
    );
  }, 16);
}

/**
 * Set up a time clock
 */
function timerExample() {
  const timer = new Tock({
    callback: function () {
      document.getElementById("clockface").value = timer.msToTime(timer.lap());
    },
  });

  document.getElementById("start").addEventListener("click", function () {
    timer.start(document.getElementById("clockface").value);
  });

  document.getElementById("lap").addEventListener("click", function () {
    // Get the time from the timer and convert to a string
    const time = timer.msToTime(timer.lap());

    // Append the string to the list
    const li = document.createElement("li");
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
  const countdown = new Tock({
    countdown: true,
    interval: 250,
    callback: function () {
      document.getElementById("countdown_clock").value = countdown.msToTime(
        countdown.lap()
      );
    },
    complete: function () {
      alert("Time's up!");
    },
  });

  document
    .getElementById("startCountdown")
    .addEventListener("click", function () {
      countdown.start(document.getElementById("countdown_clock").value);
    });

  document
    .getElementById("pauseCountdown")
    .addEventListener("click", function () {
      countdown.pause();
    });

  document
    .getElementById("stopCountdown")
    .addEventListener("click", function () {
      countdown.stop();
    });

  document
    .getElementById("resetCountdown")
    .addEventListener("click", function () {
      countdown.stop();
      document.getElementById("countdown_clock").value = "00:02";
    });
}

window.onload = function () {
  explanationSection();
  timerExample();
  countdownTimerExampld();
};
