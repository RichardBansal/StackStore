'use strict';
var router = require('express').Router();
var User = require('mongoose').model('User');
var Order = require('mongoose').model('Order');

// router.post('/create', function(req, res, next){
// 	console.log("Create account route!");
// 	User.create(req.body).then(fulfilled, rejected);
// 	function fulfilled(user){
// 		//console.log(user);
// 	}

// 	function rejected(error){
// 		//console.log(error);
// 	}
// });

router.put('/edit', function(req, res, next) {
	console.log("Edit account route!");
	// console.log(req.body);

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
	var populatedArr = [];
	var arrIndex = 0;
	// console.log('/api/account/',req.user.orders.length);

	// console.log('req.user',req.user);

	//This is created to only provide only shareable user data
	
	var user = {
		name: req.user.name,
		addressBilling: req.user.addressBilling,
		addressShipping: req.user.addressShipping,
 		phoneNumber: req.user.phoneNumber,
 		email: req.user.email, 
 		accountType: req.user.accountType
 	};

 	// console.log(user);

	req.user.orders.forEach(function(order, index){
		Order.findOne({_id: order}).populate('products.product').exec().then(fulfilled, rejected);	
	});
	

	function fulfilled(order){
		populatedArr.push(order);
		arrIndex++;

		if(arrIndex === req.user.orders.length)
			res.status(200).json({user:user, orders:populatedArr});
	}

	function rejected(error){
		done(error);
	}

	
});

router.get('/all', function(req, res, next) {
	console.log('ROUTE: /account/all');
	User.find().exec()
		.then(function(users) {
			//console.log(users);
			res.status(200).json(users);
		});
});

module.exports = router;