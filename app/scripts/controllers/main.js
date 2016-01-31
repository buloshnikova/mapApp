'use strict';

/**
 * @ngdoc function
 * @name mapAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mapAppApp
 */
angular.module('mapAppApp')
  .controller('MainCtrl', MainCtrl);
function MainCtrl(datastore,$scope) {
  this.$scope=$scope;
  this.datastore = datastore;
  var ctrl=this;
}
MainCtrl.prototype.addNuw = function () {
  this.datastore.add({value: {text: "test"}})
};
MainCtrl.prototype.removeTrip = function (id) {
  this.datastore.removeTrip(id);
};
Object.defineProperty(MainCtrl.prototype, "list", {
  get: function () {
    return this.datastore.getAll();
  }
});
