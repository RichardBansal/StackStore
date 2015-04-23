'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');

router.get("/*",function(req,res,next){
	Product.find({}).exec()
		.then(fulfilled, rejected);

	function fulfilled(products){
		res.send(products);
	}

	function rejected(error){
		console.log(error);
	}
});

module.exports = router;
