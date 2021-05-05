<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
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
            text: "Time Spent",
            color: "#FFFFFF",
            size: 16,
            display: true,
            padding: 10,
          },
          legend: {
            display: true,
            position: "bottom",
            align: "center",
            labels: {
              color: "#FFFFFF",
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
</div>

<style>
  canvas {
    display: flex;
    justify-content: center;
    width: 1px;
    height: 1px;
    background-color: #212121;
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
