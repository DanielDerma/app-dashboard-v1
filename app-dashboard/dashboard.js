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
    // var ctx2 = document.getElementById("myChart2").getContext("2d");
    // window.myChart = new Chart(ctx2, config);
    // var ctx3 = document.getElementById("myChart3").getContext("2d");
    // window.myChart = new Chart(ctx3, config);
  };
})();

function dropHandler(ev) {
  console.log("Fichero(s) arrastrados");

  // Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // Si los elementos arrastrados no son ficheros, rechazarlos
      if (ev.dataTransfer.items[i].kind === "file") {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log("... file[" + i + "].name = " + file.name);
      }
    }
  } else {
    // Usar la interfaz DataTransfer para acceder a el/los archivos
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log(
        "... file[" + i + "].name = " + ev.dataTransfer.files[i].name
      );
    }
  }

  // Pasar el evento a removeDragData para limpiar
  removeDragData(ev);
}

function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function removeDragData(ev) {
  console.log("Removing drag data");

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to remove the drag data
    ev.dataTransfer.items.clear();
  } else {
    // Use DataTransfer interface to remove the drag data
    ev.dataTransfer.clearData();
  }
}

// Doughnut
// Pie
