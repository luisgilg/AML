'use strict';

angular.module('amlApp')
  .factory('playerFactory',['$http','$interval',
    function ($http,$interval) {
    
    var _currentTrack = null;    
    var _onChangeArray = [];
    var _onTimeUpdateArray = [];

    var _audioElement =  angular.element("#audioElement");

    var _timerSlider = angular.element("#timerSlider");

    var _isTimerPress = false;

    // _timerSlider.bind('mousedown',function(){
    //   _isTimerPress=true;
    // });

    // _timerSlider.bind('mouseup',function(){
    //   _isTimerPress=false;
    //   var value = _timerSlider.slider("option", "value");
    
    //   var tVal = (value * _progress.duration)/100;


    //   _audioElement[0].currentTime = tVal;

    // });

    
    var _progress = {
      elapsed:0,
      duration:0,
      elapsedString : function(){
        return secondsToHms(this.elapsed);
      },
      durationString : function(){
        return secondsToHms(this.duration);
      },
      elapsedPercent : function(){
        return (this.elapsed * 100)/this.duration;
      }
    };

    var _status = {
      isPlaying : false,
      canPlay:false
    };

    var _audio_clock;

    function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
    }

    _audioElement.bind("timeupdate", function() {
      //if(_isTimerPress){return;}
      _progress.elapsed = parseFloat(this.currentTime);
      _progress.duration = parseFloat(this.duration);     
      return _onTimeUpdate(_progress);
    });

    var _onPlayTrack = function(){};


    var _onChange = function(status){      
      for (var i = 0; i < _onChangeArray.length; i++) {
        _onChangeArray[i](status);
      };
    };

     var _onTimeUpdate = function(progress){      
      for (var i = 0; i < _onTimeUpdateArray.length; i++) {
        _onTimeUpdateArray[i](progress);
      };
    };
    
    var _toogle = function(){
      _status.isPlaying = !_status.isPlaying;
      if (!_currentTrack) { return this;}
        _currentTrack.isPlaying = _status.isPlaying;

        return this;
    }

    var _timeUpdate = function(){
      //if (_isTimerPress) {return;};
      
      _progress.elapsed += 0.1;
      return _onTimeUpdate(_progress); 
    }

    // Public API here
    return {
      init:function(){
        _status.isPlaying = false;
        _status.canPlay = false;
        _onChange(_status);
        return this;
      },
      setStatus:function(value){
        if (!value) {return this;}

        _status.canPlay = value.canPlay;
        _onChange(_status);
        return this;
      },
      loadTrack:function(track){
        var _this = this;
        if (_currentTrack && track._id == _currentTrack._id) {
          
          return this.play();
        };

        this
        .pause()
        .setStatus({canPlay:false});

        _audioElement.html('');
        _audioElement.append('<source src="http://' + window.location.host + '/api/track/stream/' + track._id + '" type="audio/mpeg">')

        _currentTrack = track;
        if (track.duration) {
          _progress.duration = track.duration;
          _onTimeUpdate(_progress);
        };
        _progress.elapsed = 0;

        _onPlayTrack(track);        

        _audioElement.bind("load",function(){
          _this.setStatus({canPlay:true});

        });

        _audioElement.trigger('load');

        return this.play();
      },
      loadTrackById:function(id, callback){

      },
      onLoadTrack:function(callback){
        _onPlayTrack=callback;
        return this;        
      },
      onChange:function(callback){
        _onChangeArray.push(callback);
        return this;
      },
      onTimeUpdate:function(callback){
        _onTimeUpdateArray.push(callback);
        return this;
      },
      play : function(){

        if (!_currentTrack) { return this;}
        if (_status.isPlaying){return this;}

       
        _audioElement.trigger('play');
        
        
        
        _audio_clock = $interval(function(){
          _timeUpdate();
        }, 100);

        _toogle();
        _onChange(_status);
        return this;
      },
      pause : function(){
        if (!_currentTrack) { return this;}
        if (!_status.isPlaying){return this;}

        $interval.cancel(_audio_clock);
        _audioElement.trigger('pause');

        _toogle();
        _onChange(_status);
        return this;
      },
      onPause:function(callback){

        return this;
      },
      
    };
  }]);
