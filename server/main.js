process.env.MAIL_URL="smtp://arqavanzada.alerta%40gmail.com:arduino123@smtp.gmail.com:465/";

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

    var temp = valor_temp();
    var hum = valor_hum();
    var wind = valor_viento();

    if(temp>configNew.umbral_temp){
        console.log('supero umbral temperatura')
        enviarMail(configNew.mail_alerta, "Alerta - Temperatura de "+temp+"°C mayor al umbral de "+configNew.umbral_temp+"°C");
    }

    if(hum>configNew.umbral_hum){
        console.log('supero umbral hum')
        enviarMail(configNew.mail_alerta, "Alerta - Humedad del "+hum+"% mayor al umbral del "+configNew.umbral_hum+"%");
    }

    if(wind>configNew.umbral_viento){
        console.log('supero umbral viento')

        enviarMail(configNew.mail_alerta, "Alerta - Viento a "+wind+"Km/h mayor al umbral de "+configNew.umbral_viento+"Km/h");
    }


    Mediciones.insert({
        temperatura: temp,
        humedad: hum,
        viento: wind,
        date : new Date()
    });
};

intervalo_refresco = Meteor.setInterval(lecturaSensores, intervalo_original*1000);


function valor_temp(){
    //acá hay que leer el sensor de temperatura de la placa, y devolverlo listo para guardar
    var temp = ['10','15','20','24','35','28'];
    rand_temp = Math.floor(Math.random() * (5 - 0)) + 0;
    return temp[rand_temp];
}

function valor_hum(){
    //acá hay que leer el sensor de humedad de la placa, y devolverlo listo para guardar
    var hum = ['50','12','5','7','8','10'];
    rand_hum= Math.floor(Math.random() * (5 - 0)) + 0;
    return hum[rand_hum];
}

function valor_viento(){
    //acá hay que leer el sensor de viento de la placa, y devolverlo listo para guardar
    var viento = ['15','20','35','40','50','60'];
    rand_viento= Math.floor(Math.random() * (5 - 0)) + 0;
    return viento[rand_viento];
}

function enviarMail(to, subject){
    Email.send({
        from: "arqavanzada.alerta@gmail.com",
        to: to,
        subject: subject,
        text: subject
    });
}
