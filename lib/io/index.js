'use strict';

function Io () {
	this.version = '1.0';	
	this.File = require('./file');
	this.Config = require('./config');	
}


var io = module.exports = exports = new Io();