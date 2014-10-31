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

Meteor.publish('mediciones', function() {

  return Mediciones.find();

});
/**

notifications = new Meteor.Stream('server-notifications');

//allow any connected client to listen on the stream
notifications.permissions.read(function(userId, eventName) {
	return true;
});

 //notify clients with a message per every second
 setInterval(function() {

  notifications.emit('message', 'Port open', Date.now());
  notifications.emit('message', 'Comando: IDEN\n', Date.now());


}, 10000);


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

 */


var zeitDep = new Deps.Dependency(); // !!!
var zeitValue;
var zeitInterval;
var interval;
interval = Sensores.findOne().frec_refresh;


function uhrzeit() {
  intervalNew = Sensores.findOne().frec_refresh;
  if(interval!=intervalNew){
    Meteor.clearInterval(zeitInterval);
    console.log(interval);
    zeitInterval = Meteor.setInterval(uhrzeit, intervalNew*1000);
  }
  interval = intervalNew;


  var temp = valor_temp();
    console.log(temp);
  var hum = valor_hum();
    console.log(hum);
  var viento = valor_viento();
    console.log(viento);


  Mediciones.insert({
    temperatura: temp,
    humedad: hum,
    viento: viento,
    date : new Date()
  });


  console.log("Mediciones: "+Mediciones.find().count());

  console.log("PRUEBAAAAAAAA");
  console.log(intervalNew);
};



//post = Sensores.findOne();

//console.log(post.frec_refresh);

//uhrzeit(); /* Call it once so that we'll have an initial value */
zeitInterval = Meteor.setInterval(uhrzeit, interval*1000);


function valor_temp(){
  var temp = ['10','15','20','24','35','28'];
  rand_temp = Math.floor(Math.random() * (5 - 0)) + 0;
  return temp[rand_temp];
}

function valor_hum(){
 var hum = ['50','12','5','7','8','10'];
  rand_hum= Math.floor(Math.random() * (5 - 0)) + 0;
  return hum[rand_hum];
}

function valor_viento(){
 var viento = ['15','20','35','40','50','60'];
  rand_viento= Math.floor(Math.random() * (5 - 0)) + 0;
  return viento[rand_viento];
}