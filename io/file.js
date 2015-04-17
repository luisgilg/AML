'use strict';
var id3 = require('id3js');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var async = require('async');
var config = require('./config');


exports.loadId3 = function(filePath,callback){
	async.parallel({
		fsStats:function(callback){
			return fs.lstat(filePath,callback);	
		},
		metadata:function(callback){
			return id3({ file: filePath, type: id3.OPEN_LOCAL },callback);
		},
		config:function(callback){
			return config.load(callback);
		}
	},
	function(err,result){
		if (err) {return callback(err);}
		var pStats = path.parse(filePath);
		pStats.relDir = path.relative(result.config.collectionPath,pStats.dir);
		var obj = _.merge(pStats,result.fsStats,result.metadata.v2);
		return callback(null,obj);
		
	});
}

exports.print = function(msg){
	console.log(msg);
}