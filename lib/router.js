Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        Meteor.subscribe('mediciones');
        return Meteor.subscribe('sensores');
    }
});

Router.map(function() {
    this.route('estacionHome', {
        path: '/',
        data: function() {
            return Mediciones.findOne({}, {
                sort: {
                    date: -1
                }
            });
        }
    });
    this.route('adminPanel', {
        path: '/config',
        data: function() {
            return Sensores.findOne();
        }
    });
});

Router.onBeforeAction('loading');