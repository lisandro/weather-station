
Template.adminPanel.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var sensor = {
      sensor_id: 1, // capaz sin ''
      hum_a: $(e.target).find('[id=hum_a]').val(),
      hum_b: $(e.target).find('[id=hum_b]').val(),
      hum_c: $(e.target).find('[id=hum_c]').val(),
      temp_a: $(e.target).find('[id=temp_a]').val(),
      temp_b: $(e.target).find('[id=temp_b]').val(),
      temp_c: $(e.target).find('[id=temp_c]').val(),
      wind_a: $(e.target).find('[id=wind_a]').val(),
      wind_b: $(e.target).find('[id=wind_b]').val(),
      wind_c: $(e.target).find('[id=wind_c]').val(),
      check_hum: $(e.target).find('[id=check_hum]').is(':checked'),
      check_temp: $(e.target).find('[id=check_temp]').is(':checked'),
      check_wind: $(e.target).find('[id=check_wind]').is(':checked'),
    }
    
    Meteor.call('sensor', sensor, function(error, id) {
      if (error)
        return alert(error.reason);

      Router.go('adminPanel');
    });
  }
});
