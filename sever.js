var express = require('express'),
		path = require('path'),
		http = require('http');

var app = express();

app.configure(function(){
	app.set('port',process.env.PORT || 3000);
	app.use(express.logger('dev')); 
	//app.use(express.bodyParser()),
	//app.use(express.bodyParser({uploadDir:__dirname+'/public/uploads'})),
	//app.use(express.bodyParser({uploadDir:'./uploads'})),
	app.use(express.static(path.join(__dirname, '/')));
});

http.createServer(app).listen(app.get('port'),function(){
	console.log("express server listening on port" + app.get('port'));
});
/*
app.listen(3000);
console.log('listen on port 3000 ...');*/