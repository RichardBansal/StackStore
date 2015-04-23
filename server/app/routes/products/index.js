'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');

router.get('/',function(req,res,next){
	var modelParams = req.query.category ? {category: req.query.category} : {};
	Product.find(modelParams).exec()
		.then(fulfilled, rejected);

	function fulfilled(products){
		res.json(products).status(200);
	}

	function rejected(err){
		next(err);
	}
});

module.exports = router;
