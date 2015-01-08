/**
 * Created by lisandro on 30/10/14.
 */

Mediciones = new Meteor.Collection('mediciones');

Mediciones.allow({
    update: function() {
        return true;
    },
    insert: function() {
        return true;
    },
    remove: function() {
        return false;
    }
});