'use strict';

/**
 * @ngdoc service
 * @name mapAppApp.datastore
 * @description
 * # datastore
 * Factory in the mapAppApp.
 */
angular.module('mapAppApp')
  .factory('datastore', function (localStorageService, uuid2) {
    // Service logic
    // ...

    var tripList = [];
    //var selectedTrip = {};
    var storageSync = false;

    function getTripsListFromStorage() {
      //var keysLength = localStorageService.length();
      var temp = [];
      //if (localStorageService.length() > 0) {

      var keys = localStorageService.keys();
      for (var i in keys) {
        if (keys.hasOwnProperty(i)) {
          temp.push({
            id: keys[i],
            value: getTripSingle(keys[i])
          })
        }

      }
      tripList = temp;
      //}
      //alert(keys)
    }


    function getTripList() {
      if (!storageSync) {
        storageSync = true;
        getTripsListFromStorage();
      }
      return tripList;
    }

    function addTrip(obj) {
      var key = uuid2.newuuid();
      localStorageService.set(key, obj);
      getTripsListFromStorage();
      return key;
    }

    function updateTrip(id,obj) {
      localStorageService.set(id, obj);
      getTripsListFromStorage();
    }

    function removeTrip(id) {
      localStorageService.remove(id);
      getTripsListFromStorage();
    }

    function getTripSingle(id) {
      return localStorageService.get(id)
    }

    function isStorageSuported() {
      if (localStorageService.hasOwnProperty('isSupported'))
        return localStorageService['isSupported'];
    }

    // Public API here
    return {
      getAll: getTripList,
      getSingle: getTripSingle,
      add: addTrip,
      update: updateTrip,
      removeTrip: removeTrip,
      isStorageSuported: isStorageSuported
    };
  });
