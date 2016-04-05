Meteor.startup(function () {
    Sensors.remove({});
	Temperature.remove({});
	if (Sensors.find().count() === 0) {
        var data = [{
            name: "Sensor 1",
            typeSensor: "sensor1"
        }];
        _.each(data, function(list) {
			console.log(list);
          var sensor_id = Sensors.insert({
              name: list.name,
              typeSensor: list.typeSensor
          });
		  
		  //Descomentar para simular el sensor
		  /*
		  Meteor.setInterval(function () {
			  temperatura = getRandomValue(10,35);
			  fecha = new Date();
              Temperature.insert({
                  value: temperatura,
                  typeSensor: list.typeSensor,
                  createdAt: fecha
              });
              console.log(list.typeSensor + ":" + temperatura + "°C");
            }, 1000);
			function getRandomValue(max, min) {
			 return Math.floor(Math.random() * (max - min)) + min;
        };
		*/
		//Descomentar para simular el sensor
		
        });

    }
});