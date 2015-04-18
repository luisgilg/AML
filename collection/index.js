var _ = require('lodash');
var io = require('../io');
var fs = require('fs');
var async = require('async');
var logger = require('../logger');


function Collection(){
	this.setCollectionPath=function(dir, callback){
		var obj = {collectionPath: dir};
		return this.setSetting(obj,callback);		
	}

	this.setBoxPath=function(dir, callback){
		var obj = {boxPath: dir};
		return this.setSetting(obj,callback);		
	}

	this.setCollectionPattern=function(pattern, callback){
		var obj = {collectionPattern: pattern};
		return this.setSetting(obj,callback);		
	}

	this.setCollectionFailurePattern=function(pattern, callback){
		var obj = {failurePattern: pattern};
		return this.setSetting(obj,callback);		
	}

	this.setSetting=function(obj, callback){
		return async.waterfall([
			function(callback){
				return io.Config.load(callback);
			},
			function(conf, callback){
				conf = _.merge(conf,obj);
				return io.Config.save(conf,callback);
			}],
			function(err){
				if (err){return callback(err);}
				return callback(null);
			});		
	}

	this.walkBox = function(callbackM){
		return async.waterfall([
			function(callbackA){
				return io.Config.load(callbackA);
			},
			function(conf, callbackB){
				return io.File.walk(conf.boxPath,callbackB); 
			}],
			function(err,valid,invalid){
				

				if(err) return callback(err);
				return callbackM(null,valid,invalid);
			});		

	}
}

var collection = module.exports = exports = new Collection();