Meteor.startup(function () {
    Sensors.remove({});
	Temperature.remove({});
	if (Sensors.find().count() === 0) {
        var data = [{
            name: "Temperature",
            sensorType: "Temperature"
        }];
        _.each(data, function(list) {
			console.log(list);
          var sensor_id = Sensors.insert({
              name: list.name,
              sensorType: list.sensorType
          });
		  
		  //Descomentar para simular el sensor
		  /*
		  Meteor.setInterval(function () {
			  temperatura = getRandomValue(10,35);
			  fecha = new Date();
              Temperature.insert({
                  value: temperatura,
                  sensorType: list.sensorType,
                  createdAt: fecha
              });
              console.log(list.sensorType + ":" + temperatura + "°C");
            }, 1000);
			function getRandomValue(max, min) {
			 return Math.floor(Math.random() * (max - min)) + min;
        };
		*/
		//Descomentar para simular el sensor
		
        });

    }
});