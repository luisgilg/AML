'use strict';

angular.module('amlApp')
  .controller('MainCtrl', ['$scope','playerFactory','trackFactory','$timeout', 
    function ($scope, playerFactory,trackFactory,$timeout) {
    


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
    $scope.toogleMe=function(item){
      if (item.isPlaying) {
        return playerFactory.pause();
      };
      return playerFactory.loadTrack(item);
    }

    $scope.loadMore=function(){
      $scope.isBusy = true;
      
      return $timeout(function(){
        $scope.isBusy=false;
        $scope.allItems = true;       
      },10000);
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
