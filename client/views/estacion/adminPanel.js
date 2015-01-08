Template.adminPanel.events({
    'submit form': function(e) {
        e.preventDefault();

        var configId = this._id;

        var sensor = {
            sensor_id: 1, // capaz sin ''
            hum_a: parseFloat($(e.target).find('[id=hum_a]').val()),
            hum_b: parseFloat($(e.target).find('[id=hum_b]').val()),
            hum_c: parseFloat($(e.target).find('[id=hum_c]').val()),
            temp_a: parseFloat($(e.target).find('[id=temp_a]').val()),
            temp_b: parseFloat($(e.target).find('[id=temp_b]').val()),
            temp_c: parseFloat($(e.target).find('[id=temp_c]').val()),
            wind_a: parseFloat($(e.target).find('[id=wind_a]').val()),
            wind_b: parseFloat($(e.target).find('[id=wind_b]').val()),
            wind_c: parseFloat($(e.target).find('[id=wind_c]').val()),
            check_hum: $(e.target).find('[id=check_hum]').is(':checked'),
            check_temp: $(e.target).find('[id=check_temp]').is(':checked'),
            check_wind: $(e.target).find('[id=check_wind]').is(':checked'),
            umbral_hum: $(e.target).find('[id=umbrl_hum]').val(),
            umbral_temp: $(e.target).find('[id=umbrl_temp]').val(),
            umbral_viento: $(e.target).find('[id=umbrl_wind]').val(),
            frec_refresh: $(e.target).find('[id=frec_refresh]').val(),
            mail_alerta: $(e.target).find('[id=exampleInputEmail1]').val(),
            hora_encendido: $(e.target).find('[id=horaEncendido]').val(),
            minuto_encendido: $(e.target).find('[id=minutoEncendido]').val(),
            hora_apagado: $(e.target).find('[id=horaApagado]').val(),
            minuto_apagado: $(e.target).find('[id=minutoApagado]').val()
        }

        Sensores.update(configId, {
            $set: sensor
        }, function(error) {
            if (error) {
                alert(error.reason);
            } else {
                //alert('Done');
            }
        });
    },

    "click #encenderLuzD": function(event, template) {
        Meteor.call('encenderLuzD', function(error, result) {});
    },

    "click #encenderLuzI": function(event, template) {
        Meteor.call('encenderLuzI', function(error, result) {});
    },

    "click #encenderLuces": function(event, template) {
        Meteor.call('encenderLuces', function(error, result) {});
    },

    "click #apagarLuces": function(event, template) {
        Meteor.call('apagarLuces', function(error, result) {});
    }

});