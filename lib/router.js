Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('estacionHome', {path: '/'});
	this.route('adminPanel', {path: '/config'});
});