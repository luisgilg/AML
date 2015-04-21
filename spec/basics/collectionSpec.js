var lib = require('../../lib');
var path = require('path');
var logger = lib.logger;
var collection = lib.collection;

var lib = require('../../server');


describe('Collection',function(){
	var error = null;
	var validFiles=null;
	var invalidFiles=null;
	var saved = null;

	beforeEach(function(done){
		error = null;
		validFiles=null;
		invalidFiles=null;
		saved = null;


		done();
	});

	// describe('setCollectionPath',function(){
	// 	beforeEach(function(done){
	// 		var dir = '/home/luisgil/Music/AML/collection';
	// 		collection.setCollectionPath(dir,function(err){
	// 			error = err;
	// 			done();
	// 		});

	// 	});

	// 	it('should setCollectionPath ',function(){
	// 		expect(error).toBe(null);
	// 	});
	// });


	// describe('setBoxPath',function(){
	// 	beforeEach(function(done){
	// 		var dir ='/home/luisgil/Music/AML/box';

	// 		collection.setBoxPath(dir,function(err){
	// 			error = err;
	// 			done();
	// 		});

	// 	});

	// 	it('should setBoxPath ',function(){
	// 		expect(error).toBe(null);
	// 	});
	// });

	// describe('setCollectionPattern',function(){
	// 	beforeEach(function(done){
	// 		var pattern = '$collectionPath/$artist/$album/$file';
	// 		collection.setCollectionPattern(pattern,function(err){
	// 			error = err;
	// 			done();
	// 		});

	// 	});

	// 	it('should setCollectionPattern ',function(){
	// 		expect(error).toBe(null);
	// 	});
	// });

	// describe('setCollectionFailurePattern',function(){
	// 	beforeEach(function(done){
	// 		var pattern = '$boxPath/failures/$date/$file';
	// 		collection.setCollectionFailurePattern(pattern,function(err){
	// 			error = err;
	// 			done();
	// 		});

	// 	});

	// 	it('should setCollectionFailurePattern ',function(){
	// 		expect(error).toBe(null);
	// 	});
	// });


	// describe('walkBox',function(){
	// 	beforeEach(function(done){			
	// 		collection.walkBox(function(err,vFiles,iFiles){

	// 			error = err;
	// 			validFiles= vFiles;
	// 			invalidFiles = iFiles;

	// 			//logger.info({valid:vFiles, invalid:iFiles});
				
	// 			done();
	// 		});

	// 	});

	// 	it('should walkBox ',function(){
	// 		expect(error).toBe(null);
	// 		expect(validFiles).not.toBe(null);
	// 		expect(invalidFiles).not.toBe(null);
	// 	});
	// });

	/*describe('import copy',function(){
		beforeEach(function(done){
			collection.import('/home/luisgil/Music/AML/box',false,function(err){
				error = err;				
				done();
			});

		});

		it('should import ',function(){
			expect(error).toBe(null);
		});
	});*/


	// describe('import move',function(){
	// 	beforeEach(function(done){
	// 		collection.import('/home/luisgil/Music/AML/box',true,true, function(err){
	// 			error = err;				
	// 			done();
	// 		});

	// 	});

	// 	it('should import ',function(){
	// 		//asmine.getEnv().defaultTimeoutInterval = 999999999999999999;

	// 		expect(error).toBe(null);
	// 	});
	// });

	
	describe('import box',function(){
		//jasmine.getEnv().defaultTimeoutInterval = 999999999999999999;
		var originalTimeout = 0; 
		
		
		beforeEach(function(done){
        	done();
		});

		afterEach(function(done){
            done();
        });

		it('should import box ',function(done){
			collection.importBox(function(err,result){
				expect(err).toBe(null);
				expect(result).not.toBe(null);
				done();
			});
		},100000000);
	});

});