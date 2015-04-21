var _ = require('lodash');
var io = require('../io');
var fs = require('fs-extra');
var async = require('async');
var logger = require('../logger');
var tools = require('../tools');
var path = require('path');

var trackController  = require('../../server/api/track/track.controller');


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

	this.walkBox = function(callback,succesDelegate, invalidDelegate){
		var _this = this;

		return io.Config.load(function(err,conf){
			if(err) return callback(err);
			return _this.walk(conf.boxPath, callback,succesDelegate, invalidDelegate);
		});
	}

	this.walk = function(dir, callback, succesDelegate, invalidDelegate){
		return io.File.walk(dir, callback, succesDelegate, invalidDelegate);
	}

	this.ensureFileName = function(fileName, fromFile, callback){
		var _this = this;


		return fs.stat(fileName,function(err,stat){
			if (err) {
				if (err.code=='ENOENT') {
					return callback(null,fileName,fromFile);
				}else{
					return callback(err,fileName,fromFile);
				}
			}
			var p = path.parse(fileName);
			var testPath = path.join(p.dir,p.name+'_copy'+p.ext);
			return _this.ensureFileName(testPath,fromFile,callback);
		});
	}

	this.copyWithPattern = function(config, move, items, patternName, callback){
		var _this = this;

		var filesOk = [];
		var filesErr = [];

		return async.forEach(items,function(file, cb){					
			var fullObj = tools.completeFormater(config,file);					
			var destPath = tools.format(config[patternName],fullObj);

			return _this.ensureFileName(destPath,fullObj.fullPath,function(err,fileName,fromFile){
				if (err) {
					return cb(err);
				};
				if (move) {
					return fs.move(fromFile, fileName, function(err){							
						if (err){
							filesErr.push(file);
							return cb(err);
						};


						var outPath = path.parse(fileName);
						var outFile = _.merge(file,outPath);
						outFile.fullPath = fileName;


						if (patternName!='failurePattern') {
							outFile.relDir = path.relative(config.collectionPath,outFile.dir);

							outFile = tools.prepareObj(outFile);

						};

						filesOk.push(outFile);
						return cb(null);
					});

				};
				return fs.copy(fromFile, fileName, function(err){							
					if (err){
						filesErr.push(file);
						return cb(err);
					};
					var outPath = path.parse(fileName);
					var outFile = _.merge(file,outPath);
					outFile.fullPath = fileName;

					
					if (patternName!='failurePattern') {
						outFile.relDir = path.relative(config.collectionPath,outFile.dir);
						outFile = tools.prepareObj(outFile);
					};
					
					filesOk.push(outFile);
					return cb(null);
				});
			});

		},
		function(err){
			if (err) return callback(err);
			return callback(null,{ok: filesOk, error: filesErr});
		});
	}

	this.saveImport = function(items,callback){
		var succes = [];
		return async.forEach(items,function(item,cb){
			
			return trackController.localCreate(item,function(err,obj){

				if (err) {

					return cb(err)
				};

				succes.push(obj);
				return cb(null);
			});
		},function(err){
			if (err) {return callback(err)};

			return callback(null, succes);

		});
	}
	this.importBox = function(callback){

		var _this = this;
		
		var move=true;
		var moveInvalid=true;

		return io.Config.load(function(err,config){
			if(err)return callback(err);
			
			return _this.import(config.boxPath,move,moveInvalid,function(err,result){
				if(err)return callback(err);
				logger.info(result.valid.ok);

				return _this.saveImport(result.valid.ok,callback);
			});
		});		
	}

	//may be to be deprected
	this.import = function(dir, move, moveInvalid, callback){
		var _this = this;
		var config = {};
		
		return async.waterfall([
			function(callback){
				return io.Config.load(callback);
			},
			function(conf, callback){
				config = conf;
				return _this.walk(dir, callback);
			},
			function(valids, invalids, callback){
				//return console.log(valids);
				return async.parallel({
					invalid : function(callback){
						if (moveInvalid){
							return _this.copyWithPattern(config, move, invalids, 'failurePattern',callback);
						}
						return callback({ok:[],error:[]})
					},
					valid : function(callback){
						return _this.copyWithPattern(config,move, valids, 'collectionPattern',callback);						
					}
				}, function(err,result){
					if (err) {
						return callback(err);
					};
					return callback(null, result);
				});


			}],
			function(err,result){
				if (err){return callback(err);}
				return callback(null,result);
			});
		
	}
}

var collection = module.exports = exports = new Collection();