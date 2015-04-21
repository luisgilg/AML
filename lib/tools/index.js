var _ = require('lodash');
var entities = require("entities");

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
		if (value.constructor === Array) {
			var result = [value.length];
			for (var i = 0; i < value.length; i++) {
				var vl = value[i];
				vl = vl.toString().replace(/^\s+|\s+$/g, '');
				result[i]= vl;
			}
			return result;
		};
		return value.toString().replace(/^\s+|\s+$/g, '');
	}

	this.cleanArray = function(array) {
		var _this = this;
		var uniques = [];
		for (var i = 0; i < array.length; i++) {
			var value = array[i];
			value = entities.decodeHTML(value);
			value = value.replace(/[.*+?^=!:${}()&;_#|\s\-\[\]\/\\]/g,'');
			value = _this.trim(value);

			if (!value || value=='' || value=='0') {continue};
			if (uniques.indexOf(value)<0){
				uniques.push(value);
			}
		};
		return uniques;
	}

	this.prepareObj=function(obj){
		var _this = this;
		var keywords = [];
		var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    	var mS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    	var mSL =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
    	'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    	var exclude = ['root','dir','file','base','fullPath','dev','mode','nlink'
    	,'uid','gid','rdev','blksize','ino','size','blocks','relDir','encodeSetting', 'encodingTime','fileType','picture',
    	'rating','isTrack','length','duration','disk'];
		for(key in obj){
			if (exclude.indexOf(key)>0) {continue};

			var value = obj[key];
			if (!value || value == '') {continue;};


			if (value.constructor === Array){
				for (var i = 0; i < value.length; i++) {
					var vl = value[i];

					if (typeof vl === 'number'){
						keywords.push(vl.toString());
					};

					if (typeof vl === 'string') {						
						vl = entities.decodeHTML(_this.trim(vl));
						keywords=keywords.concat(vl.split(/[.*+?^=!:${}()&;_#|\s\-\[\]\/\\]+(?!$)/g));
					};
				};
			};

			if (value.constructor === Date){
				var day=value.getDate();
				var month = value.getMonth();
				var year = value.getFullYear();
				
				keywords.push(day.toString());
				keywords.push(month.toString());
				keywords.push(year.toString());
				keywords.push(mL[month]);
				keywords.push(mS[month]);
				keywords.push(mSL[month]);

			};

			if (typeof value === 'number'){
				keywords.push(value.toString());
			};

			if (typeof value === 'string') {
				value = entities.decodeHTML(_this.trim(value));
				keywords=keywords.concat(value.split(/[.*+?^=!:${}()&;_#|\s\-\[\]\/\\]+(?!$)/g));
				obj[key]=value;
			};
		}

		obj.keywords = _this.cleanArray(keywords);
		return obj;
	}

	this.escapeRegExp = function(value) {
		if (value.constructor === Array) {
			var result = [value.length];
			for (var i = 0; i < value.length; i++) {
				var vl = value[i];
				vl = vl.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
				result[i]= vl;
			}
			return result;
		};
				
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