'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
// var Product = require('mongoose').model('Product');
// var Review = require('mongoose').model('Review');
var Order = require('mongoose').model('Order');
var User = require('mongoose').model('User');
var q = require("q");

router.post('/',function(req,res,next){
	
	req.body.products.forEach(function(product){
		product.product._id = mongoose.Types.ObjectId(product.product._id);
	});

	console.log('req.body',req.body);

	Order.create(req.body).then(fulfilled, rejected);

	function fulfilled(response){
		console.log(response);
		res.sendStatus(200);
	}
	function rejected(error){
		next(error);
	}

});

module.exports = router;