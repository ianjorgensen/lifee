#!/usr/bin/env node

var server = require('router').create();
var file = require('./lib/file').file;
var watchr = require('watchr');
var io = require('socket.io').listen(server);
var port = process.argv[2] || 9080;
var live = process.argv[3] || false;
var url = require('url');   
var last = Date.now();
var triggered = false;
var time;
var wait = 1500;
var mime = require('mime');

watchr.watch({path: './', listener: function(event, path) {	
	triggered = false;                          
	if (Date.now() - last > wait && event === 'change') {
		triggered = true;
		io.sockets.emit('fileChanged', {path: '/' + path});
		last = Date.now();
		if(live) {
			clearTimeout(time);
			time = setTimeout(function() {
				if(!triggered) {
					console.log('end');
					io.sockets.emit('fileChanged', {path: '/' + path});	
				}
			}, wait);	
		}
	}
}});

server.get('/lifee.js',file(__dirname + '/lib/lifee.js'));

server.get('/*', file('./{*}'));

server.listen(port);

console.log('server running on port',port);

process.on('uncaughtException', function(err) { console.log(err.stack) });