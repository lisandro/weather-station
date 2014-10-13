notifications = new Meteor.Stream('server-notifications');

if (Meteor.isClient) {
  //listen on notifications on the message event
  notifications.on('message', function(message, time) {
    var completeMessage = message + ' @ ' + new Date(time).toString();
    $('#messages').prepend('<div>' + completeMessage + '</div>');
  });


}
