'use strict';
// Import the Modules
var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));

var User = require('./lib/speaker');

var prods = require('./routes/prods');
//var auth = require('./routes/auth');
/*
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
}
*/
// routers are mounted in particular root urls
app.use('/api/user', prods);
//app.use('/api/auth', auth);

var port = process.env.PORT || 3000; // where the application will run

// start the server
app.listen(port, function() {
    console.log('Magic happens on port ' + port);	
});