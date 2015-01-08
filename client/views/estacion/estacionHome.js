var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
var optionsObject = {
    columns: [{
        title: 'Date',
        data: 'date', // note: access nested data like this
        className: 'nameColumn'
    }, {
        title: 'Temp',
        data: 'temperatura', // note: access nested data like this
        className: 'nameColumn'
    }, {
        title: 'Hum',
        data: 'humedad',
        className: 'nameColumn'
    }, {
        title: 'Viento',
        data: 'viento',
        className: 'imageColumn'
    }],
    "searching": false,
    "bLengthChange": false,
    "order": [0, 'desc'],
    dom: 'T<"clear">lfrtip',
    "oTableTools": {
        "aButtons": [
            "print"
        ]
    }
}


Template.estacionHome.helpers({
    dateNow: function() {
        now = new Date();
        var minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        var hour = now.getHours();
        return days[now.getDay()] + ", " + hour + ":" + minutes;
    },
    reactiveDataFunction: function() {
        return dataTableData;
    },
    optionsObject: optionsObject // see below
});


dataTableData = function() {
    return Mediciones.find({}, {
        sort: {
            date: -1
        }
    }).fetch();
};