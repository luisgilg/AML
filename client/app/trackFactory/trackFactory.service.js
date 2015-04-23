'use strict';

angular.module('amlApp')
  .factory('trackFactory',['sosvos', 
    function (sosvos) {
    // Service logic
    // ...

  

    // Public API here
    return {
      index: function (callback) {
         return sosvos
        .init()
        .defaultError()
        .success(callback)
        .get('/api/track/');
      }
    };
  }]);
