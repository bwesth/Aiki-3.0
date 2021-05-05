<script>
  import { onMount } from "svelte";
  import Chart from 'chart.js/auto';
  function createPieChart() {
    var ctx = document.getElementById("pie-chart");
    let myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["www.codecademy.com", "www.facebook.com", "www.youtube.com", "www.kotaku.com", "www.reddit.com"],
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
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#FFFFFF',
                }
            }
        },
        layout: {
            padding: 20,
            scale: 40
        }
      }
    });
  }
  onMount(createPieChart);
</script>

<div class="chart">
  <canvas id="pie-chart" />
</div>

<style>

    canvas {
        display: flex;
        width: 100px;
        height: 100px;
    }

  .chart {
    margin: 1rem 1rem 0 0;
    background-color: var(--backgroundColorSecondary);
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>