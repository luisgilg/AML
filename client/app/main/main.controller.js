'use strict';

angular.module('amlApp')
  .controller('MainCtrl', ['$scope','playerFactory','trackFactory', 
    function ($scope, playerFactory,trackFactory) {
    

    playerFactory
    .onChange(function(status){
      $scope.canPlay = status.canPlay;  
    });

    trackFactory.index(function(items){
      $scope.items = items;
      $scope.canPlay=true;
    });

    $scope.playMe=function(item){
      return playerFactory.loadTrack(item);
    }

    $scope.pauseMe=function(item){
      return playerFactory.pause();
    }

    /*$scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };*/
  }]);
