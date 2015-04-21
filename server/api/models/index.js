var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var PlayListTypeArray = ['normal','intelligent'];

var TrackSchema = new Schema({
	title : { type : String },
	artist : { type : Array },
	albumartist : { type : Array },
	album : { type : String },
	year : { type : Number },
	genre : { type : Array },
	track : {
		no : { type : Number },
			of : { type : Number }
	},
	disk : {
		no : { type : Number },
			of : { type : Number }
	},
	duration : { type : Number },
	initialKey : { type : String },
	comment : { type : String },
	length : { type : String },
	band : { type : String },
	rating : { type : String },
	
	newAttr : { type : Number },
	compilation : { type : String },
	composer : { type : String },
	newAttr : { type : Number },
	remixed : { type : String },
	fullPath : { type : String },
	relDir : { type : String },
	file : { type : String },
	size : { type : Number },
	atime : { type : Date },
	mtime : { type : Date },
	ctime : { type : Date },
	birthtime : { type : Date },
	playList : [{ type : Schema.ObjectId, ref : 'PlayList' }],
	keywords : {type:Array },
	itime : {type:Date, default:Date.now}
});

var PartSchema = new Schema({
	no : { type : Number },
	of : { type : Number }
});

var PlayListSchema = new Schema({
	titles : { type : String },
	ctime : { type : Date },
	type : { type : String, enum : PlayListTypeArray },
	tracks : [{ type : Schema.ObjectId, ref : 'Track' }],
	filters : [{ type : Schema.ObjectId, ref : 'IntelligentFilter' }]
});

var IntelligentFilterSchema = new Schema({
	filter : { type : String },
	playList : { type : Schema.ObjectId, ref : 'PlayList' },
	childs : [{ type : Schema.ObjectId, ref : 'IntelligentFilter' }],
	parent : { type : Schema.ObjectId, ref : 'IntelligentFilter' }
});

TrackSchema.index({ keyWords:'text' });
//PlayList.index({ keyWords:'text' });


var models={
	Track : mongoose.model('Track', TrackSchema), 
	Part: mongoose.model('Part', PartSchema),
	PlayList : mongoose.model('PlayList', PlayListSchema),
	varIntelligentFilter : mongoose.model('IntelligentFilter', IntelligentFilterSchema)
}

module.exports = models;