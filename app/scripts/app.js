'use strict';

/**
 * @ngdoc overview
 * @name mapAppApp
 * @description
 * # mapAppApp
 *
 * Main module of the application.
 */
angular
  .module('mapAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
    'angularUUID2',
    'ui-leaflet',
    'dndLists'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .when('/trip/:id', {
        templateUrl: 'views/trip.html',
        controller: 'TripCtrl',
        controllerAs: 'trip'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
