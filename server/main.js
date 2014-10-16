
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