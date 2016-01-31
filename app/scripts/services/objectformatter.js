'use strict';

/**
 * @ngdoc service
 * @name mapAppApp.objectFormater
 * @description
 * # objectFormatter
 * Service in the mapAppApp.
 */
angular.module('mapAppApp')
  .service('objectFormatter', function (uuid2) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var getPoint = function (data, text) {
      var point = {};
      point = {
        id: uuid2.newuuid().replace(/-/g, ''),
        name: text,
        message: text,
        focus: false,
        objectType: "Point",
        draggable: true,
        lng: data[0],
        lat: data[1]
      }
      return point;
    }
    var getPath = function (data, text) {
      var path = {
        id: uuid2.newuuid().replace(/-/g, ''),
        name: text,
        message: text,
        objectType:"LineString",
        type:"polyline",
        color: 'red',
        weight: 4,
        latlngs: []
      }
      //var coorArray = data.geometry.coordinates;
      for (var i in data) {
        var point=getPoint(data[i], "New Path Point #" + (Number(i) + 1))
        path.latlngs.push(point);
      }
      return path;
    }
    this.newListPoint = function (data) {
      return getPoint(data, "New Point")
    }
    this.newListPath = function (data) {
      return getPath(data, "New Path")
    }
  });
