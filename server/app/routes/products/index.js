'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');
var Review = require('mongoose').model('Review');
var User = require('mongoose').model('User');
var q = require("q");

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
	Product.findOne({"_id":req.params.id}).exec()
		.then(foundProduct, rejected);

	function foundProduct(product){

		q.all(product.findReviews())
			.then(foundReviews,rejected);
		
		function foundReviews(reviews){
			q.all(
					reviews.map(function(review){
						return review.findUser();
					})
				)
				.then(foundUser,rejected);

			function foundUser(user){
				// console.log();
				res.json({user:user[0].name, product:product, reviews:reviews});
			}
		}
	}

	function rejected(error){
		console.log(error);
		next(error);
	}
});

module.exports = router;
