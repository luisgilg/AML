var path = require('path');
var bunyan = require('bunyan');

var logPath = path.join(process.cwd(),'log.log');

var log = bunyan.createLogger(
	{
		name: 'AML',
		streams: [
	    {
	      stream: process.stdout            // log INFO and above to stdout
	    },
	    {
	      path: logPath  // log ERROR and above to a file
	    }
	  ]

	});

var logger = module.exports = exports = log;
