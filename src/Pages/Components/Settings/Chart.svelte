<script>
  import { onMount } from "svelte";
  import Chart from 'chart.js/auto';
  let description =
    "Here's an overview of your time spent online.";
  function createDoughnut() {
    var ctx = document.getElementById("doughnut-chart");
    let myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Learning", "www.facebook.com", "www.youtube.com", "www.kotaku.com", "www.reddit.com"],
        datasets: [
          {
            label: "Time (seconds)",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850"
            ],
            data: [2478, 5267, 734, 784, 433]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Hello"
        }
      }
    });
  }
  onMount(createDoughnut);
</script>

<div class="chart">
  <h4 class="heading">Time Chart</h4>
  <p class="sub-heading">{description}</p>
  <canvas id="doughnut-chart" width="4%" height="3%" />
</div>

<style>
    .heading {
      margin: 1rem 0;
      font-size: var(--fontSizeSettings);
      color: var(--textColor);
    }
    .sub-heading {
      margin-bottom: 2.5rem;
      color: var(--textColor);
      font-size: var(--fontSizeSettings);
    }
    .chart {
      margin: 1rem 1rem 0 0;
      padding: 30px 20px;
      background-color: var(--backgroundColorPrimary);
      flex-direction: column;
      width: 90%;
      height: 90%;
    }
  </style>