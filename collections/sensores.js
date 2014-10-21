Sensores = new Meteor.Collection('sensores');

Sensores.allow({
  insert: function(userId, lugar){
    return true;
  },
  update: function(userId, lugares, fields, modifier){
    return true;
  },
  remove: function (userId, docs){
    return true;
  }
});

Meteor.methods({
  sensor: function(sensorAttributes) {
    var user = Meteor.user();
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