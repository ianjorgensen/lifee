var common = require('common');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var less = require('less');

var file = function(location, options) {
	options = options || {};
	options.status = options.status || 200;
	
	return function(request, response) {
		var url = common.format(location, request.params);

		var onnotfound = function() {
			response.writeHead(404);
			response.end();
		};

		var onerror = function(err) {
			response.writeHead(500);
			//console.log(err);
			response.end(err);
		};

		if (/\/\.\.\//.test(url)) { // security check
			onnotfound();
			return;
		}
		
		if(mime.lookup(url) == 'text/css') {
			fs.readFile(url,'ascii', common.fork(onnotfound, function(data) {
				try {
					console.log('try');
	   			less.render(data, function(err, text) {
	   				console.log('done', err);
						response.writeHead(200, {'content-type':'text/css'});
						response.end(err ? data : text);
					});
				} catch (e) {
					console.log('catch');
				  response.writeHead(200, {'content-type':'text/css'});
					response.end(data);
				}
			}));
			return;
		}

		if(mime.lookup(url).indexOf('image/') != -1) {
			fs.readFile(url, function(err, data){
		    response.writeHead(200, {"Content-Type": "image/png"});
		    response.write(data, "binary");
		    response.end();
			});			
			return;
		}
		fs.stat(url, common.fork(onnotfound, function(stat) {
			var headers = {
				'content-type':mime.lookup(url),
				'content-length':stat.size,
				'date':new Date().toUTCString(),
				'last-modified':stat.mtime.toUTCString()
			};
			
			if (options.cacheMaxAge !== undefined) {
				headers['cache-control'] = 'public, max-age=' + options.cacheMaxAge;
			}
			
			response.writeHead(options.status, headers);
			fs.createReadStream(url).pipe(response);
		}));
	};
};
exports.file = file;

var image = function(location) {
	return function(request, response) {
		var path = common.format(location, request.params);
		
		fs.readFile(path, function(err, data){
	    response.writeHead(200, {"Content-Type": "image/png"});
	    response.write(data, "binary");
	    response.end();
		});
	}
};
exports.image = image;
