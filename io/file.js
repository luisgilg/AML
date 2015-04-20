'use strict';
var id3 = require('id3js');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var async = require('async');
var config = require('./config');

var logger = require('../logger');


function _loadId3(filePath,callback){
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
		//pStats.relDir = path.relative(result.config.collectionPath,pStats.dir);
		pStats.fullPath= filePath;
		pStats.file = pStats.base;
		var obj = _.merge(pStats,result.fsStats);

		if(result.metadata && result.metadata.v2 && result.metadata.v2.version[0]){
			obj = _.merge(obj,result.metadata.v2);
			//Unknown Album
			if(!obj.album || obj.album == ''){
				obj.album='Unknown Album';
			}

			if(!obj.artist || obj.artist == ''){
				obj.artist='Unknown Artist';
			}

			if(!obj.title || obj.title == ''){
				obj.title=obj.name;
			}

		}
		return callback(null,obj);
		
	});
}

exports.loadId3 = _loadId3;

function _walk(rootPath, callbackM, validDelegate, invalidDelegate){
	var vDelegate = validDelegate || function(){};
	var iDelegate = invalidDelegate || function(){};

	return async.waterfall([
		function(callbackA){
			return fs.readdir(rootPath,callbackA);
		},
		function(files, callbackB){

			var vFiles = [];
			var iFiles = [];

			return async.forEach(files,function(file,cb){
				var fullFile = path.join(rootPath,file);

				fs.lstat(fullFile, function(err,fsStat){

					if(err){
						iFiles.push(fullFile);
						return cb(null);
					}

					if (fsStat && fsStat.isFile()) {
						_loadId3(fullFile,function(err,fileTag){
							if(err){
								var obj = {fullPath:fullFile};
								iFiles.push(obj);
								iDelegate(obj);
								return cb(null);
							}
							if (!fileTag){								
								var obj = {fullPath:fullFile};
								iFiles.push(obj);
								iDelegate(obj);

								return cb(null);
							}	

							if (!fileTag.version || !fileTag.version[0] ){
								fileTag.fullPath = fullFile;							
								iFiles.push(fileTag);
								iDelegate(fileTag);

								return cb(null);
							}

							vDelegate(fileTag);		

							vFiles.push(fileTag);
							return cb(null);
						});											
					}else if(fsStat && fsStat.isDirectory()){
						
						_walk(fullFile,function(err,vFl,iFl){
							if (vFl) {
								vFiles = vFiles.concat(vFl);
							}
							if (iFl) {
								iFiles= iFiles.concat(iFl);	
							}
							return cb(null);
						},vDelegate,iDelegate);
					}
				});

			},function(err){
				

				if(err){return callbackB(err);}

				return callbackB(null,vFiles,iFiles);
			});			
		}],
		function(err, validFiles, invalidFiles){

			if (err){return callbackM(err);}
			return callbackM(null,validFiles,invalidFiles);
		}
	);
}

exports.walk = _walk; 