'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');

router.get("/",function(req,res,next){
	Product.find({}).exec()
		.then(fulfilled, rejected);

	function fulfilled(products){
		res.send(products);
	}

	function rejected(error){
		console.log(error);
	}
});

router.post("/",function(req,res,next){
	// console.log(req.body);
	Product.create(req.body)
		.then(fulfilled, rejected);

	function fulfilled(products){
		// res.redirect('/');
	}

	function rejected(error){
		next(error);
	}
});

module.exports = router;
