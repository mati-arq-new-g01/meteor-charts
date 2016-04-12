Template.senseChart.created = function () {
    var self = this;

    var sensors = [{
        _id: 0,
        name: 'Temperature',
        sensorId: 'Temperature',
        color: '#0066FF'
    }];
    self.seriesSensors = new ReactiveVar(sensors);
};

Template.senseChart.helpers({
    listSensors: function () {
        return Template.instance().seriesSensors.get();
    },
    Sensors: function () {
        return Sensors.find({});
    }
});


Template.senseChart.rendered = function () {
    var self = this;
    $('#color').colorpicker();
    builtColumn();

    self.autorun(function () {
        updateChart();
    });
};


var seriesList = [{
    name: 'Temperature',
	lineWidth: 4,
    data: [],
    yAxis: 0,
    tooltip: {
        valueSuffix: ' mm'
    }
}] ;



function updateChart() {
    if (typeof (chartSensers) !== 'undefined') {
        Temperature.find({
            sensorType: "Temperature"
        }).observe({
            added: function (temperature) {
                if (chartSensers.series.length > 0) {
                    var series = chartSensers.series[0],
                        shift = series.data.length > 20; // Si la serie es mayor a 20 empezar a correr
                    var point = {
                        x: temperature.createdAt,
                        y: temperature.value
                    };
                    // añadir el punto a la serie
                    chartSensers.series[0].addPoint(point, true, shift);
                };

            }
        });

    } else {
        console.log('Alerta!')
    }
};


function builtColumn() {


    chartSensers = new Highcharts.Chart({
        chart: {
            zoomType: 'xy',
            renderTo: 'container-column',
			type: "spline"
        },
        colors: ["#0066FF"],
        title: {
            text: 'Temperatura del sensor'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
			labels: {
			format: '{value}°C',
			style: {
				color: '#0066FF'
			}
		},
		title: {
			text: 'Temperature',
			style: {
				color: '#0066FF'
				}
			}
		},
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>Hora:' + Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>Valor:' + Highcharts.numberFormat(this.y, 0);
            }
        },
        exporting: {
            enabled: false
        },
		plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: seriesList
    });
	Highcharts.setOptions({
	  global: {
		useUTC: false
	  }
	});
};