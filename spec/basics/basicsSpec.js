'use strict';

var io = require('../../io');
var path = require('path');
var logger = require('../../logger');



describe("AML Basic", function() {	
	var result=null;
	var error = null;

	var appDir = '/home/luisgil/Music/';
	var track = path.join(appDir,'tracks/Adam Beyer/Beatport - Adam Beyer\'s Decade Playlist/06 Human Reason (Len Faki Remix).mp3');
	

	beforeEach(function(done) {
		result=null;
		error=null;
		done();
	});

	describe('IO',function(){

		beforeEach(function(done) {
			io.File.loadId3(track, function(err,tags){
				result =tags;
				error=err;
				done();
			});
		});

		it("should get track metadata", function(done) {
			expect(error).toBe(null);
			expect(result).not.toBe(null);
			done();
		});

	});	

	describe('Config',function(){
		beforeEach(function(done){
			io.Config.load(function(err,config){
				error = err;
				result=config;
				done();
			});
		});

		it("should get config", function(done) {
			expect(error).toBe(null);
			expect(result).not.toBe(null);
			done();
		});
	});
});