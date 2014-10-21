Router.configure({
	layoutTemplate: 'layout',
  	waitOn: function() { return Meteor.subscribe('sensores'); }
});

Router.map(function() {
	this.route('estacionHome', {
		path: '/'	
	});
	this.route('adminPanel', {
		path: '/config/',
		data: function() { return Sensores.find(); }
	}); // hacer el find del sensor_id , por ej, 1 siempre.

});
