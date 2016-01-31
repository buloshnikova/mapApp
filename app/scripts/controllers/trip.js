'use strict';

/**
 * @ngdoc function
 * @name mapAppApp.controller:TripCtrl
 * @description
 * # TripCtrl
 * Controller of the mapAppApp
 */
angular.module('mapAppApp')
  .controller('TripCtrl', TripCtrl);
function TripCtrl($scope, objectFormatter, $routeParams, datastore, $location, leafletData) {
  this.datastore = datastore;
  var ctrl = this;
  this.objectFormatter = objectFormatter;
  this.$routeParams = $routeParams;
  this.list = [];
  this.tripName="New Trip";
  this.$scope = $scope;
  this.center = {
    lat: 52,
    lng: 1,
    zoom: 5
  };
  this.isNew = (this.$routeParams.id == "new");
  if (!this.isNew) {
    var obj=this.datastore.getSingle(this.$routeParams.id);
    this.list = obj.list;
    this.center=obj.center;
    this.tripName=obj.name;
  }
  this.$scope.$on("map.addPoint", function (event, data) {
    switch (data.geometry.type) {
      case 'Point':
        ctrl.list.push(ctrl.objectFormatter.newListPoint(data.geometry.coordinates));
        break;
      case 'LineString':
        ctrl.list.push(ctrl.objectFormatter.newListPath(data.geometry.coordinates));

        break
    }

  })

  this.$scope.$on("map.pointMoved", function (event, data) {
    var index = this.list.findIndex(function (n) {
      return n.id == data.modelName;
    });
    if (index != -1) {
      this.list[index] = data.model;
    } else {
      for (var i in this.list) {
        if (this.list[i].objectType != 'Point') {
          var pIndex = this.list[i].latlngs.findIndex(
            function (n) {
              return n.id == data.modelName
            }
          );
          if (pIndex != -1) {
            this.list[i].latlngs[pIndex] = data.model;
            break;
          }
        }
      }
    }

  }.bind(this));

  this.saveMap = function () {
    var saveObj={list: this.list, center: this.center, name:this.tripName}
    if (this.isNew) {

      var newId = this.datastore.add(saveObj);
      $location.path("/trip/" + newId);
      //alert(newId);
    } else {
      this.datastore.update(this.$routeParams.id, saveObj);
    }
  }
  this.centerMap = function (item) {
    if (item.objectType == "Point") {
      this.center.lat = item.lat;
      this.center.lng = item.lng;
    }
  }
  this.centerToPath = function (item) {
    leafletData.getMap().then(function (map) {
      map.fitBounds(item.latlngs);
    })
  }
}

Object.defineProperty(TripCtrl.prototype, "map", {
  get: function () {
    return {
      markers: this.markers,
      paths: this.paths
    }
  }
})

Object.defineProperty(TripCtrl.prototype, "markers", {
  get: function () {
    var markersList = {};
    for (var i in this.list) {
      if (this.list[i].objectType == "Point") {

        markersList[this.list[i].id] = (this.list[i]);
      } else {
        var path = this.list[i]

        for (var index in path.latlngs) {
          markersList[path.latlngs[index].id] = (path.latlngs[index]);
        }
      }
    }
    return markersList
  }
});
Object.defineProperty(TripCtrl.prototype, "paths", {
  get: function () {
    return this.list.findAll(function (n) {
      return n.objectType == "LineString";
    })

  }
})
