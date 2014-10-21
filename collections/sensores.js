Sensores = new Meteor.Collection('sensores');

Meteor.methods({
  sensor: function(sensorAttributes) {
    var user = Meteor.user()
      //roomWithSamename = Rooms.findOne({name: roomAttributes.name});
    
    // ensure the user is logged in
    //if (!user)
      //throw new Meteor.Error(401, "Please login to edit sensors");

    // Capaz se puede hacer lo de sensor.hum_a = sensorAttributes.hum_a;
    
    // pick out the whitelisted keys
    var sensor = _.extend(_.pick(sensorAttributes, 'hum_a', 'hum_b', 'hum_c', 'temp_a', 'temp_b', 'temp_c','wind_a', 'wind_b', 'wind_c', 'check_hum','check_temp','check_wind', 'sensor_id'), {
      userId: user._id, 
      creator: user.username, 
      submitted: new Date().getTime()
    });
    
    var sensorId = Sensores.insert(sensor);
    
    return sensorId;
  }
});