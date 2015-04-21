'use strict';
var router = require('express').Router();
var path = require('path');

// var products = require(path.join(__dirname,'../../db/models')).Product;
var products = require('mongoose').model('Product');

router.get("/",function(req,res,next){
	console.log('here');
	// products.find({}).exec()
	// 	.then(fulfilled, rejected);

	// function fulfilled(products){
	// 	console.log(products);
	// 	// res.send(products);
	// }

	// function rejected(error){
	// 	console.log(error);
	// }
});

module.exports = router;
