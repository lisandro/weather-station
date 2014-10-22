if (Sensores.find().count() === 0) {
 
 Sensores.insert({
   sensor_id: 1,
   hum_a: 1,
   hum_b: 2,
   hum_c: 3,
   temp_a: 3,
   temp_b: 2,
   temp_c: 1,
   wind_a: 1,
   wind_b: 2,
   wind_c: 3,
   check_hum: true,
   check_temp: false,
   check_wind: true,
   umbral_hum: 10,
   umbral_temp: 20,
   umbral_viento: 30,
   mail_alerta:'lisandrofalconi@gmail.com',
   frec_refresh: 5
 });

} 


Meteor.publish('sensores', function() {

 return Sensores.find();

});
/**

notifications = new Meteor.Stream('server-notifications');

//allow any connected client to listen on the stream
notifications.permissions.read(function(userId, eventName) {
	return true;
});

var SerialPort = Meteor.npmRequire('serialport');
SerialPort.list(function (err, ports) {
	  ports.forEach(function(port) {
	    console.log(port.comName);
	    console.log(port.pnpId);
	    console.log(port.manufacturer);
	  });
});
var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
  baudrate: 115200,
  databits: 8,
  stopbits: 1,
  parity: 'none',
  parser: SerialPort.parsers.readline('\n\r')
});

serialPort.on('open',function() {
  console.log('Port open');
 
  serialPort.write("IDEN\n", function() {
    serialPort.drain(function (err,args) {
      console.log('ERR1 '+err);
      console.log('ARGS1 '+args);
      serialPort.on('data', function(data) {
      	notifications.emit('message', data, Date.now());
        console.log(data);
      });
    });
  });

  

});

//notify clients with a message per every second
setInterval(function() {

  notifications.emit('message', 'Port open', Date.now());
  notifications.emit('message', 'Comando: IDEN\n', Date.now());


}, 10000);
*/