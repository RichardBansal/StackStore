'use strict';
var router = require('express').Router();
var User = require('mongoose').model('User');
var Order = require('mongoose').model('Order');

router.post('/create', function(req, res, next){
	console.log("Create account route!");
	User.create(req.body).then(fulfilled, rejected);
	function fulfilled(user){
		//console.log(user);
	}

	function rejected(error){
		//console.log(error);
	}
});

router.put('/edit', function(req, res, next) {
	console.log("Edit account route!");
	//console.log(req.body);

	var user = req.body;

	User.findByIdAndUpdate(user._id, user).exec().then(fulfilled, rejected);

	function fulfilled(updateUser){
		console.log(updateUser);
		res.sendStatus(200);
	}

	function rejected(error){
		console.error(error);
		res.sendStatus(500);
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