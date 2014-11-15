var SerialPort = Meteor.npmRequire('serialport');
var async = Meteor.npmRequire('async');

process.env.MAIL_URL="smtp://arqavanzada.alerta%40gmail.com:arduino123@smtp.gmail.com:465/";

if (Sensores.find().count() === 0) {
    Sensores.insert({
        sensor_id: 1,
        hum_a: 0,
        hum_b: 0.153,
        hum_c: (25*-1),
        temp_a: 0,
        temp_b: 0.262,
        temp_c: (21.5*-1),
        wind_a: 0,
        wind_b: 0.89,
        wind_c: 0,
        check_hum: true,
        check_temp: false,
        check_wind: true,
        umbral_hum: 10,
        umbral_temp: 20,
        umbral_viento: 30,
        mail_alerta:'lisandrofalconi@gmail.com',
        frec_refresh: 5,
        hora_encendido: 16,
        minuto_encendido: 50,
        hora_apagado: 17,
        minuto_apagado: 00
    });

}

Meteor.publish('sensores', function() {
    return Sensores.find();
});

Meteor.publish('mediciones', function() {
    return Mediciones.find();
});
var intervalo_refresco;
var intervalo_original;
intervalo_original = Sensores.findOne().frec_refresh;

function lecturaSensores() {

    var configNew = Sensores.findOne();
    if(intervalo_original!=configNew.frec_refresh){
        Meteor.clearInterval(intervalo_refresco);
        console.log(intervalo_original);
        intervalo_refresco = Meteor.setInterval(lecturaSensores, configNew.frec_refresh*1000);
    }
    intervalo_original = configNew.frec_refresh;

    var c = Async.runSync(function (done) {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });

        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
                if(data==='Canal = 0'){
                    done(null,data);
                }
            });
            serialPort.write("NCAN0\n");
        });
    });

    var response = Async.runSync(function (done) {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });

        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
                var temperatura = parseInt(data.replace(/;/g, ""), 10);
                if(temperatura!= undefined){
                    done(null, temperatura);
                }
            });

            serialPort.write("RDAS\n", function (err,results) {
            });

        });
    });

    var a = Async.runSync(function (done) {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });

        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
                if(data==='Canal = 2'){
                    done(null,data);
                }
            });
            serialPort.write("NCAN2\n");
        });
    });

    var response3 = Async.runSync(function (done) {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });
        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
                var viento = parseInt(data.replace(/;/g, ""), 10);
                if(viento!=undefined){
                    done(null, viento);
                }
            });

            serialPort.write("RDAS\n", function (err,results) {
            });

        });
    });

    var b = Async.runSync(function (done) {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });

        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
                if(data==='Canal = 1'){
                    done(null,data);
                }
            });
            serialPort.write("NCAN1\n");
        });
    });

    var response4 = Async.runSync(function (done) {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });
        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
                var humedad = parseInt(data.replace(/;/g, ""), 10);
                if(humedad!=undefined){
                    done(null, humedad);
                }
            });

            serialPort.write("RDAS\n", function (err,results) {
            });

        });
    });

    var responseD = Async.runSync(function (done) {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });
        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
                done(null, data);
            });

            serialPort.write("RDDI\n", function (err,results) {
            });

        });
    });


    var temp = response.result;
    var hum = response4.result;
    var wind = response3.result;
    var digital = responseD.result;

    console.log('###################');
    console.log('Temp: '+temp);
    console.log('Humendad: '+hum);
    console.log('Viento: '+wind);
    console.log('Digital: '+digital);
    console.log('###################');

    temp = valor_humano(temp,configNew.temp_a, configNew.temp_b, configNew.temp_c);
    hum = valor_humano(hum,configNew.hum_a,configNew.hum_b,configNew.hum_c);
    wind = valor_humano(wind,configNew.wind_a,configNew.wind_b,configNew.wind_c);

    console.log('Temp: '+temp);
    console.log('Humendad: '+hum);
    console.log('Viento: '+wind);


    if(temp>configNew.umbral_temp){
        enviarMail(configNew.mail_alerta, "Alerta - Temperatura de "+temp+"°C mayor al umbral de "+configNew.umbral_temp+"°C");
    }

    if(hum>configNew.umbral_hum){
        enviarMail(configNew.mail_alerta, "Alerta - Humedad del "+hum+"% mayor al umbral del "+configNew.umbral_hum+"%");
    }

    if(wind>configNew.umbral_viento){
        enviarMail(configNew.mail_alerta, "Alerta - Viento a "+wind+"Km/h mayor al umbral de "+configNew.umbral_viento+"Km/h");
    }

    if(digital>0){
        if(digital==1){ // Significa Gabinete abierto
            enviarMail(configNew.mail_alerta, "Alerta - Gabinete Abierto a las "+new Date());
        }
        if(digital==2){ // falta de energía solar
            enviarMail(configNew.mail_alerta, "Alerta - Falta de Energia Solar a las "+new Date());
        }
        if(digital==3){ // Gabinete abierto y falta de energía solar
            enviarMail(configNew.mail_alerta, "Alerta - Gabinete Abierto - Falta de Energia Solar a las"+new Date());
        }
    }

    if(temp>50 || temp<-50 || isNaN(temp)){
        temp="-";
        enviarMail(configNew.mail_alerta, "Falla en el sensor de temperatura a las "+new Date());
    }

    if(hum>100 || hum<0 || isNaN(hum)){
        hum="-";
        enviarMail(configNew.mail_alerta, "Falla en el sensor de humedad a las "+new Date());
    }

    if(wind>200 || wind<0 || isNaN(wind)){
        wind="-";
        enviarMail(configNew.mail_alerta, "Falla en el sensor de viento a las "+new Date());
    }

    dateActual = new Date();
    var minutes = dateActual.getMinutes();
    var hour = dateActual.getHours();
    if((hour == configNew.hora_encendido) && (minutes == configNew.minuto_encendido)){
        Meteor.call('encenderLuces', function (error, result) {
        });
    }

    if((hour == configNew.hora_apagado) && (minutes == configNew.minuto_apagado)){
        Meteor.call('apagarLuces', function (error, result) {
        });
    }

    Mediciones.insert({
        temperatura: temp,
        humedad: hum,
        viento: wind,
        check_temp: configNew.check_temp,
        check_hum: configNew.check_hum,
        check_wind: configNew.check_wind,
        date : new Date()
    });
};

intervalo_refresco = Meteor.setInterval(lecturaSensores, intervalo_original*1000);


function valor_humano(valor_placa,a,b,c){
    return Math.round(a*valor_placa*valor_placa+b*valor_placa+c);
}

function enviarMail(to, subject){
    Email.send({
        from: "arqavanzada.alerta@gmail.com",
        to: to,
        subject: subject,
        text: subject
    });
}

Meteor.methods({
    encenderLuzD: function () {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });

        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
            });
            serialPort.write("WRDO2\n");
        });
    },

    encenderLuzI: function () {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });

        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
            });
            serialPort.write("WRDO1\n");
        });
    },

    encenderLuces: function () {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });

        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
            });
            serialPort.write("WRDO0\n");
        });
    },

    apagarLuces: function () {
        var serialPort = new SerialPort.SerialPort("/dev/ttyUSB0", {
            baudrate: 115200,
            databits: 8,
            stopbits: 1,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n\r')
        });

        serialPort.on('open',function() {
            serialPort.on('data', function(data) {
            });
            serialPort.write("WRDO3\n");
        });
    }
});