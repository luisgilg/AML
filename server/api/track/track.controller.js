//track.controller.js
//var _ = require('lodash');
var models = require('../models');
//var fs = require('fs');
//var async = require('async');

exports.create = function(req, res) {

}

exports.localCreate = function(obj,callback) {
	var source = models.Track;
	obj.itime = new Date();
	//TODO: Change this
	//HACK: para que guarde màs reapido, quizas la img vaya al fs
	obj.picture = [];

	return source.create(obj,callback);
	//return source.collection.insert(obj,callback);
}