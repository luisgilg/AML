'use strict';

angular.module('amlApp')
  .controller('NavbarCtrl',['$scope','$location','playerFactory','$document','$interval', 
    function ($scope, $location, playerFactory,$document,$interval) {

    $scope.canPlay=false;

    playerFactory
    .init()
    .onChange(function(status){
      $scope.canPlay = status.canPlay;
    })
    .onTimeUpdate(function(progress){
      $scope.elapsed = progress.elapsedString();
      $scope.duration = progress.durationString();
      $scope.timerValue = progress.elapsedPercent();
      
    })
    .onLoadTrack(function(track){      
      $scope.track = track;      
    });

    $scope.play = function(){      
      playerFactory.play();      
    };

    $scope.pause = function(){      
      playerFactory.pause();
    };

    
   
    

    // $scope.menu = [{
    //   'title': 'Home',
    //   'link': '/'
    // }];

    // $scope.isCollapsed = true;

    // $scope.options = [{
    //   'title': 'Countries',
    //   'link': '/location/country'
    // },
    // {
    //   'title': 'Organization',
    //   'link': '/location/organization'
    // },
    // {
    //   'title':'Business category',
    //   'link':'/categories/business'
    // },
    // {
    //   'title':'Unit category',
    //   'link':'/categories/unit'
    // },
    // {
    //   'title':'Industry category',
    //   'link':'/categories/industry'
    // },
    // {
    //   'title':'Installation category',
    //   'link':'/categories/installation'
    // }];

    // $scope.isActive = function(route) {
    //   return route === $location.path();
    // };
  }]);