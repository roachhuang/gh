'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {
		type: String,
		default: ''
	},
	category: {
		type: String,
		default: ''
	},
	price: {
		type: String,
		default: ''
	}
	//description:    { type: String, default: '' },
	//picture:        { type: String, default: '' },   
});

var collectionName = 'prod';
var dbName = 'spa';
var dbUri = 'mongodb://192.168.1.245/' + dbName;

// Import Mongoose
//var mongoose   = require('mongoose');
// connect to our database
mongoose.connect(dbUri, function(err) {
	console.log(err);
});
//mongoose.connect('mongodb://feiochc:hate666!@kahana.mongohq.com:10073/node-api');

// note collection name should be users, not singular.
module.exports = mongoose.model(collectionName, schema);
/* Mongoose automatically looks for the plural version of your model name. Thus, for the example above, the model user is for the users collection in the database.
 */