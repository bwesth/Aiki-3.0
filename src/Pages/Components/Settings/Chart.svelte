<!-- This handles the data and drawing functions required to generate
  a pie chart for our statistics element in the Settings menu. Uses
  'chart.js' module to do so.
Used in / Parent components: /src/Pages/Settings.svelte	
-->
<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import Fa from "svelte-fa";
  import {
faBed,
    faSkull,
    faThumbsUp
  } from "@fortawesome/free-solid-svg-icons";
  import storage from "../../../util/storage";

  //Need to get these values somehow.
  //Also need to get all data somehow and pipe it into the chart somehow lel.
  let skips = 5;
  let completed = 10;
  let snoozes = 386;

  export let stats;

  let textColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--textColor"
  );

  //Generates our pie chart.
  function createPieChart() {
    var ctx = document.getElementById("pie-chart");
    let myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "Codecademy", //ORDER MATTERS, USE NAMES, NOT URLS
          "Facebook",
          "YouTube",
          "Kotaku",
          "Reddit",
          "Other",
        ],
        datasets: [
          {
            backgroundColor: [
              //ORDER MATTERS
              "#0077b6",
              "#d00000",
              "#dc2f02",
              "#e85d04",
              "#f48c06",
              "#faa307",
            ],
            data: [5267, 2478, 734, 784, 433, 200], //ORDER MATTERS
            hoverOffset: 8,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            text: "Time Spent (in seconds)",
            color: textColor,
            size: 16,
            display: true,
            padding: 10,
          },
          legend: {
            display: true,
            position: "bottom",
            align: "center",
            labels: {
              color: textColor,
              boxWidth: 12,
              padding: 12,
            },
          },
        },
        layout: {
          padding: 10,
        },
      },
    });
  }
  onMount(createPieChart);
</script>

<div class="flex">
  <div class="chart">
    <canvas id="pie-chart" />
  </div>
  <div class="other-stats">
    <h6><Fa icon={faThumbsUp} /> Completed Sessions:</h6>
    <p>{completed}</p>
    <h6><Fa icon={faSkull} /> Emergency Skips:</h6>
    <p>{skips}</p>
    <h6><Fa icon={faBed} /> Snoozes:</h6>
    <p>{snoozes}</p>
  </div>
</div>

<style>
  canvas {
    display: flex;
    justify-content: center;
    width: 1px;
    height: 1px;
    background-color: var(--backgroundColorSecondary);
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chart {
    display: flex;
    background-color: var(--backgroundColorSecondary);
    width: 50vh;
    height: 50vh;
  }
</style>
