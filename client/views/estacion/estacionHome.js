var days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

Template.estacionHome.helpers({
	dateNow: function () {
			now = new Date();
			var minutes = now.getMinutes();
			var hour = now.getHours();
			return days[ now.getDay() ]+", "+ hour +":"+ minutes;
	}
});