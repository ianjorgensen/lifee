#!/usr/bin/env node

var server = require('router').create();
var file = require('./lib/file').file;
var watchr = require('watchr');
var io = require('socket.io').listen(server);
var port = process.argv[2] || 9080;

watchr.watch({path: './', listener: function(event, path) {
	if(event === 'change') {
		io.sockets.emit('fileChanged', {path: '/' + path});
	}
}});

server.get('/lifee.js',file(__dirname + '/lib/lifee.js'));

server.get('/*', file('./{*}'));

server.listen(port);

console.log('server running on port',port);

process.on('uncaughtException', function(err) { console.log(err.stack) });