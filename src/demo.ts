import Tock from "./tock";
import { LineChart } from "chartist";

window.onload = () => {
  let interval: undefined | number;
  const start_time = new Date().getTime();
  const interval_time = 1000;
  let naive_time = -1000;
  let naiveTickCount = 0;
  let tockTickCount = 0;

  const clockDiffEl = document.getElementById("clockDiff") as HTMLInputElement;

  const tockClockEl = document.getElementById("tockClock") as HTMLInputElement;
  const tockErrorEl = document.getElementById("tockError") as HTMLInputElement;
  const tockTickEl = document.getElementById("tockTick") as HTMLInputElement;

  const naiveClockEl = document.getElementById(
    "naiveClock"
  ) as HTMLInputElement;
  const naiveErrorEl = document.getElementById(
    "naiveError"
  ) as HTMLInputElement;
  const naiveTickEl = document.getElementById("naiveTick") as HTMLInputElement;

  const chartData = {
    labels: [],
    series: [[], []] as [number[], number[]],
  };

  const chart = new LineChart(".chart", chartData, {
    width: 500,
    height: 300,
  });

  const timer = new Tock({
    interval: interval_time,
    callback: () => {
      tockTickCount++;
      tockTickEl.value = tockTickCount.toString();

      tockClockEl.value = timer.msToTimecode(timer.lap(), true);
      tockErrorEl.value = String(
        new Date().getTime() - start_time - timer.lap()
      );

      chartData.series[0].push(timer.lap());

      chart.update();
    },
  });

  timer.start();

  interval = window.setInterval(() => {
    naiveTickEl.value = String(naiveTickCount++);

    naive_time += interval_time;
    naiveClockEl.value = timer.msToTimecode(naive_time, true);
    naiveErrorEl.value = String(new Date().getTime() - start_time - naive_time);

    chartData.series[1].push(naive_time);
    chart.update();
  }, interval_time);

  document.getElementById("stopButton")?.addEventListener("click", () => {
    console.log("hi!");
    window.clearInterval(interval);
    window.clearInterval(clockDiffInterval);
    timer.stop();
  });

  let clockDiffInterval = window.setInterval(() => {
    let current_time = new Date().getTime();
    clockDiffEl.value = timer.msToTimecode(current_time - start_time, true);
  }, 16);
};
