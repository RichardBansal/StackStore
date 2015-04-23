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
		next(error);
	}
});


router.get("/:id",function(req,res,next){
	// console.log(req.params.id);
	Product.findOne({"_id":req.params.id}).exec()
		.then(fulfilled, rejected);

	function fulfilled(product){
		res.send(product);
	}

	function rejected(error){
		next(error);
	}
});

module.exports = router;
