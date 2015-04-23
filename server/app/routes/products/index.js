'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');

router.get('/',function(req,res,next){
	Product.find({}).exec()
		.then(fulfilled, rejected);

	function fulfilled(products){
		res.json(products).status(200);
	}

	function rejected(err){
		next(err);
	}
});

module.exports = router;
