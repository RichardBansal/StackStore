'use strict';
var router = require('express').Router();
var User = require('mongoose').model('User');
var Order = require('mongoose').model('Order');

router.post('/create', function(req, res, next){
	console.log("Create user route!");
	User.create(req.body).then(fulfilled, rejected);
	function fulfilled(user){
		console.log(user);
	}

	function rejected(error){
		console.log(error);
	}
});

router.get('/', function(req,res,next){

		//TODO: test multiple orders
	Order.find({_id: req.user.orders}).populate('products.product').exec().then(fulfilled, rejected);

	function fulfilled(orders){
		res.status(200).json({user:req.user, orders:orders});
	}

	function rejected(error){
		done(error);
	}

	
});

module.exports = router;