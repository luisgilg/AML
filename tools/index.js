var _ = require('lodash');

function Tools () {
	this.format = function(content, obj){
		var _this = this;
		var result = content;
		for(key in obj){
			var re = new RegExp('\\$'+_this.escapeRegExp(key), 'g');
			//var value = _this.escapeRegExp(obj[key])
			var value = obj[key];
			
			value = _this.trim(value);

			var attrs = ['title','album','artist','comments','file'];

			if(attrs.indexOf(key)!=-1){
				value = _this.escapePath(value);
			}


			result = result.replace(re, value);
		}
		return result;
	}

	this.trim = function(value){
		return value.toString().replace(/^\s+|\s+$/g, '');
	}

	this.escapeRegExp = function(value) {
    	return value.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	this.escapePath = function(value){
		var result = value.toString().replace(/[^\w\s\\.\-\(\)\'\[\]]/gi, '_');
		result = result.replace('&amp_','&');
		result = result.replace('&amp;','&');
		result = result.replace('_amp;','&');
		result = result.replace('_amp_','&');
		return result;

	}

	this.completeFormater = function(a, b){
		var c = _.merge(a,b);

		var date = new Date();
		date = date.getFullYear().toString() + 
							date.getMonth().toString()+
							date.getDate().toString();

		c = _.merge(c,{date:date});
		return c;

	}
	
}

var tools = module.exports = exports = new Tools();