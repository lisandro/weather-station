Router.configure({
	layoutTemplate: 'layout',
  	loadingTemplate: 'loading',
  	waitOn: function() { return Meteor.subscribe('sensores'); }
});

Router.map(function() {
	this.route('estacionHome', {
		path: '/'	
	});
	this.route('adminPanel', {
		path: '/config',
		data: function() { return Sensores.findOne(); }
	}); // hacer el find del sensor_id , por ej, 1 siempre.

});

Router.onBeforeAction('loading');
