'use strict';
var router = require('express').Router();
var User = require('mongoose').model('User');
var Order = require('mongoose').model('Order');

router.post('/create', function(req, res, next){
	User.create(req.body).then(fulfilled, rejected);
	function fulfilled(user){
		console.log(user);
	}

	function rejected(error){
		console.log(error);
	}
});

router.get('/details', function(req,res,next){
	console.log(req.session);

	var user_id = req.session.passport.user;
	// console.log(user_id);
	var foundUser;
	var foundOrders;
	User.findOne({_id:user_id}).exec().then(findOrder)
		.then(fulfilled, rejected);
		//TODO: need to look up order based on user_id

	function findOrder(user){
		//TODO: implement finding multiple orders
		foundUser = user;
		// console.log(user);
		var orderId = user.orders[0];
		return Order.findOne({_id: orderId}).exec().then(function(orders){
			// console.log(orders);
			foundOrders = orders;
		});
	}

	function fulfilled(){
		// console.log(orders);
		//TODO: Only sending back email, do not send back the password salt
		// console.log(user);
		console.log({user:foundUser.email, orders: foundOrders});
		//TODO: Also grab orders based on user id and send this back
	}
	function rejected(err){
		console.log(err);
	}
});

module.exports = router;