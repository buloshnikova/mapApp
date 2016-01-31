'use strict';

/**
 * @ngdoc directive
 * @name mapAppApp.directive:mapWraper
 * @description
 * # mapWraper
 */
angular.module('mapAppApp')
  .directive('mapWrapper', function (leafletData) {
    return {
      template: '<leaflet lf-center="mapCenter" markers="map.markers" paths="map.paths" controls="controls" layers="layers" width="100%" height="500px"></leaflet>',
      restrict: 'E',
      scope: {
        mapObj: "@",
        mapCenter: "="
      },
      controller: function ($scope) {

        $scope.layers = {
          baselayers: {
            xyz: {
              name: 'OpenStreetMap (XYZ)',
              url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              type: 'xyz'
            }
          },
          overlays: {
            draw: {
              name: 'draw',
              type: 'group',
              visible: true,
              layerParams: {
                showOnSelector: false
              }
            }
          }
        };
        $scope.controls = {
          draw: {
            polyline: {
              shapeOptions: {
                color: '#f357a1',
                weight: 10
              }
            },
            polygon: false,
            marker: false
          }
        };

        $scope.map={
          center:[],
          markers:[],
          paths:[]
        }
        $scope.$watch('mapObj', function(newVal){
          console.log("map: ", newVal);
          $scope.map=angular.fromJson(newVal);
        },true);
        $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
            console.log(args);
          $scope.$emit("map.pointMoved", args);
          }
        )
        leafletData.getMap().then(function (map) {
          leafletData.getLayers().then(function (baselayers) {
            var drawnItems = baselayers.overlays.draw;

            map.on('draw:created', function (e) {
              var layer = e.layer;
              $scope.$emit("map.addPoint", layer.toGeoJSON());
            });
          });
        });
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
