'use strict';
var router = require('express').Router();
// var Product = require('mongoose').model('Product');
// var Review = require('mongoose').model('Review');
var Order = require('mongoose').model('Order');
var User = require('mongoose').model('User');
var q = require("q");

router.post('/',function(req,res,next){
	// console.log('req.body',req.body.items[0]);
	Order.create(req.body).then(fulfilled, rejected)


	function fulfilled(response){
		console.log(response);
	}
	function rejected(error){
		console.log(error);
	}
	res.sendStatus(200);
});

module.exports = router;