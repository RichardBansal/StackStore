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

	function fulfilled(order){
			res.sendStatus(200);
	
		console.log(order);
	}
	function rejected(error){
		next(error);
	}
});

router.get('/', function(req,res,next){
		var modelParams = req.query.orderId ? {_id: req.query.orderId} : {};
        //TODO: test multiple orders
    Order.find(modelParams).populate('products.product').exec().then(fulfilled, rejected);

    function fulfilled(orders){
    	// console.log(orders);
        res.status(200).json(orders);
    }

    function rejected(error){
        done(error);
    }
    
});

router.put('/',function(req,res,next){
	console.log(req.body);

	Order.findByIdAndUpdate({_id:req.body.id},{status:req.body.status}).exec().then(fulfilled);

	function fulfilled(){
		res.sendStatus(200);
	}
})

module.exports = router;