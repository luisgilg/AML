// var lib = require('../../lib');
// var path = require('path');
// var logger = lib.logger;
// var tools = lib.tools;

// describe('Tools',function () {
// 	var obj = {name:'Luis', lastName : 'Gil', age:29}
// 	var pattern1 = '$name/$lastName/$age';	
// 	var pattern2 = 'name:$name, $age:age, $lastName:$lastName';
// 	var res1='';
// 	var res2='';

// 	beforeEach(function(){
// 		res1 = tools.format(pattern1,obj);
// 		res2 = tools.format(pattern2,obj);

// 	});
// 	it('should format',function(){
// 		expect(res1).toBe('Luis/Gil/29');
// 		expect(res2).toBe('name:Luis, 29:age, Gil:Gil');

// 	});
// });