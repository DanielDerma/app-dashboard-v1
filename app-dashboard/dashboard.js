/* globals Chart:false, feather:false */

(function () {
  "use strict";

  feather.replace();

  // Graphs
  var chartColors = {
    red: "rgb(255, 99, 132)",
    blue: "rgb(54, 162, 235)",
  };

  var color = Chart.helpers.color;
  var config = {
    type: "bar",
    data: {
      datasets: [
        {
          type: "line",
          yAxisID: "temperature",
          backgroundColor: "transparent",
          borderColor: chartColors.red,
          pointBackgroundColor: chartColors.red,
          tension: 0,
          fill: false,
        },
        {
          yAxisID: "precipitation",
          backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
          borderColor: "transparent",
        },
      ],
    },
    plugins: [ChartDataSource],
    options: {
      title: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
          },
        ],
        yAxes: [
          {
            id: "temperature",
            gridLines: {
              drawOnChartArea: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Temperature (°C)",
            },
          },
          {
            id: "precipitation",
            position: "right",
            gridLines: {
              drawOnChartArea: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Precipitation (mm)",
            },
          },
        ],
      },
      plugins: {
        datasource: {
          type: "csv",
          url: "sample-dataset.csv",
          delimiter: ",",
          rowMapping: "dataset",
          datasetLabels: true,
          indexLabels: true,
        },
      },
    },
  };

  window.onload = function () {
    var ctx = document.getElementById("myChart").getContext("2d");
    window.myChart = new Chart(ctx, config);
  };
})();
