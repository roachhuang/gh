var express = require('express');
// returens router instanace which can be mounted as a middleware
var router = express.Router();

// import * as Hero from '../src/app/hero.ts'
var bodyParser = require('body-parser');
var Prods = require('../models/prods.model');
var parseUrlEncoded = bodyParser.urlencoded({
  extended: false
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('prods works');
});

// the root path relative to the path where it's mounted.
router.route('/hero')
  // get all the users when a method passed is GET
  .get(function (req, res) {
    console.log('get prod');
    Prods.find(function (err, data) {
      if (err)
        res.send(500, err);
      console.dir(data);
      res.status(200).json(data);
    })
  })
  // create a prod when the method passed is POST
  .post(parseUrlEncoded, function (req, res) {
    // create a new instance of the user model
    // it should be req.body not req.data as there is no data property in req object
    // res.send('prods/post works');
    var data = new Prods(req.body); // Prods is a schema constructor

    // save the data received
    data.save(function (err) {
      if (err) {
        console.log(err);
        return res.send(500, err);
      }
      // give some success message
      console.log(data);
      res.status(201).json(data);
    })
  });

// on accessing user Route by id
router.route('/hero/:id')
  // get the user by id
  .get(function (req, res) {
    console.log(req.params.id);
    Prods.findById(req.params.id, function (err, data) {
      if (err) {
        return res.sendstatus(500).send(err);
      }
      console.dir(data);
      res.status(200).json(data);
    })
  })
  // update the user by id
  .put(function (req, res) {
    Prods.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      console.log(req.body);
      if (err) res.send(500, err);
      res.status(200).json(post);
    });
  })
  .delete(function (req, res) {
    console.log(req.params.id);
    Prods.remove({
      _id: req.params.id
    }, function (err, data) {
      if (err)
        res.send(500, err);
      // give some success message
      //res.sendStatus(200);
      res.status(200);
    })
  });
// exports the router as a Node module
module.exports = router;
