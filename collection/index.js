var _ = require('lodash');
var io = require('../io');
var fs = require('fs');
var async = require('async');

function Collection(){
	this.setCollectionPath=function(dir, callback){
		var nPath = {collectionPath: dir};
		async.waterfall([
			function(callback){
				return io.Config.load(callback);
			},
			function(conf, callback){
				conf = _.merge(conf,nPath);
				return io.Config.save(conf,callback);
			}],
			function(err){
				if (err){return callback(err);}
				return callback(null);
			});		
		return 
	}
}

var collection = module.exports = exports = new Collection();