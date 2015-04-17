var collection = require('../../collection');
var path = require('path');

describe('Collection',function(){
	var error = null;

	describe('setCollectionPath',function(){
		beforeEach(function(done){
			var dir = path.join(process.cwd(),'tracks');
			collection.setCollectionPath(dir,function(err){
				error = err;
				done();
			});

		});

		it('should setCollectionPath ',function(){
			expect(error).toBe(null);
		});
	});
});