Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('estacionHome', {
		path: '/'	
	});
	this.route('adminPanel', {
		path: '/config',
		data: function() { Sensores.find({}, {fields: {'sensor_id':1}})}
	}); // hacer el find del sensor_id , por ej, 1 siempre.
});
