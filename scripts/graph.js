const graph = document.getElementById("graph").getContext("2d");


var sensors = new Array();

sensors.push(new Sensor("Capteur 1", "Thermique", "Interieur"));
sensors.push(new Sensor("Capteur 2", "Thermique", "Exterieur"));

setInterval(function() {
       var sensor = new Array();
       sensor = updateSensors(sensors, true);
       console.log(sensor);
       addData(sensor);
    }, 3000 );


var i = 0;
Chart.defaults.global.defaultFontSize = 18;
let chart = new Chart(graph, {
  type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: [
      "Capteur",
    ],
    datasets: [
      {
        label: ["Exterieur "],
        data: [10,10],
        backgroundColor: 'rgba(150, 249, 231,90)',
        borderColor: 'rgb(0.99.132',
        hoverBorderWidth: 3,
      },
      {
        label: "interieur ",
        data: [10,10],
        backgroundColor: "rgba(245, 249, 150,90)",
        borderColor: 'rgb(0.200.0',
        hoverBorderWidth: 3,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Capteur thermique",
      fontSize: 24,
    },
    legend: {
      display: true,
    },
    // start at 0
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    layout: {
      padding: {
        left: 100,
        right: 100,
        top: 50,
      },
    },
  },
});

function addData(sensors) {
    chart.data.labels.push(i++);//.push(i++)
    chart.data.datasets[0].data.push(sensors[0].Valeur); //.push(sensors[0].data[1])
    chart.data.datasets[1].data.push(sensors[1].Valeur);//.push(sensors[1].data[1])
    chart.update();
}