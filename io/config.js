var fs = require('fs');
var path = require('path');

exports.load = function (callback){
	var cPath = process.cwd();
	var filePath = path.join(cPath,'config.json');
	fs.readFile(filePath,'utf8',function(err,data){
		if (err){return callback(err);}

		return callback(null,JSON.parse(data));
	});
}

exports.save = function (config,callback){
	var cPath = process.cwd();
	var filePath = path.join(cPath,'config.json');
	var content = JSON.stringify(config);
	
	fs.writeFile(filePath,content,'utf8',function(err){
		if (err){return callback(err);}

		return callback(null);
	});
}