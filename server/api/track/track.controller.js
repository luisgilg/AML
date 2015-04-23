//track.controller.js
//var _ = require('lodash');
var models = require('../models');
var fs = require('fs');
//var async = require('async');

var _create = function(obj,callback) {
	var source = models.Track;
	obj.itime = new Date();
	//TODO: Change this
	//HACK: para que guarde màs reapido, quizas la img vaya al fs
	obj.picture = [];

	return source.create(obj,callback);
	//return source.collection.insert(obj,callback);
}

var _getById = function(id,callback){
	var source = models.Track;
	return source.findById(id, callback);
}

var _getAll = function(callback) {
	var source = models.Track;
	return source.find({}, callback);
}


exports.create = function(req, res) {

}

exports.index = function(req,res){
	_getAll(function(err,items){
		if (err) {return res.sendStatus(500);}
		if (!items) {return res.sendStatus(404);}

		return res.status(200).json(items);		
	});
}
exports.stream = function(req, res) {

	var id = req.params.id;

	_getById(id,function(err,obj){
		if (err) {return res.sendStatus(500);}
		if (!obj) {return res.sendStatus(404);}

		var filePath = obj.fullPath;
		

		var filseSize = obj.size;

		res.writeHead(200, {
        	'Content-Type': 'audio/mpeg', 
        	'Content-Length': filseSize
    	});

    	var readStream = fs.createReadStream(filePath);
    	readStream.pipe(res);
    	
	});

}

exports.show = function(req, res) {



}


exports.localCreate = _create;
exports.localGetById = _getById;

