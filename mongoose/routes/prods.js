'use strict';
var express = require('express');
// returens router instanace which can be mounted as a middleware
var router = express.Router();
var bodyParser = require('body-parser');
// configure app
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

// the root path relative to the path where it's mounted.
router.route('/')
    // get all the users when a method passed is GET
	.get(function(req, res) {		
		User.find(function(err, data) {
			if (err)
				res.send(err);
			res.json(data);
		})
	})
    // create a user when the method passed is POST
	.post(function(req, res) {
        // create a new instance of the user model
		var data = new User();	// User is a schema constructor

        // set the users properties (comes from the request)
	 data.name = req.body.name;
        data.category = req.body.category;
        data.price = req.body.price;
        //user.description = req.body.description;
        //user.picture = req.body.picture;      

        // save the data received
		data.save(function(err) {
			if (err)
				res.send(err);

        // give some success message
		res.status(201).json(data);  
		})
	});		
	

// on accessing user Route by id
router.route('/:user_id')
	// get the user by id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, data) {
			if (err)
				res.send(err);
			res.json(data);
		})
	})
	// update the user by id
	.put(function(req, res) {
		console.log(req.params.user_id);
		User.findById(req.params.user_id, function(err, data) {
			if (err)
				res.send(err);

            // set the users properties (comes from the request)		
            data.name = req.body.name;
            data.category = req.body.category;
            data.price = req.body.price;
            //user.description = req.body.description;
            //user.picture = req.body.picture;           

            // save the data received
			data.save(function(err) {
				if (err)
					res.send(err);

            // give some success message
			res.json(data);
			});

		})
	})	 
	.delete(function(req, res) {
		console.log(req.params.user_id);
		User.remove({ _id: req.params.user_id}, function(err, data) {
			if (err)
				res.send(err);
        // give some success message
		res.sendStatus(200);
		})
	});

// exports the router as a Node module
module.exports = router;
