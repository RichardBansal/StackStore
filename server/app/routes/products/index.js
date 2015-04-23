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
	// console.log(req.params.id);
	Product.findOne({"_id":req.params.id}).exec()
		.then(foundProduct, rejected);

	function foundProduct(product){
		// console.log('product',product);
		//iterate

		function findReviews(){
			var reviewFindsPromiseArr = [];
			// console.log(product.reviews);

			product.reviews.forEach(function(reviewID){
				// console.log('reviewID',reviewID);
				reviewFindsPromiseArr.push
					(
						Review.findOne({"_id":reviewID}).exec()
					);
			});
			return reviewFindsPromiseArr;
		}

		q.all(findReviews())
			.then(foundReviews,rejected);


		function foundReviews(reviews){

			function findUser(){
				var userFindsPromiseArr = [];
				
				console.log(reviews);

				reviews.forEach(function(review){
					userFindsPromiseArr.push
					(
						User.findOne({"_id":review.user}).exec()
					);
				});

				return userFindsPromiseArr;
			}

			q.all(findUser())
				.then(foundUser,rejected);

			function foundUser(user){
				console.log('check123', user, product, reviews);
				res.json({user:user, product:product, reviews:reviews});
				// {product:product, reviews:{reviews:reviews, user:user}}
				// TODO: REF: COMPLETE THIS VIA MODEL.METHOD
			}

			function rejected(error){
				console.log(error);
				next(error);
			}
		}

		function rejected(error){
			console.log(error);
			next(error);
		}
	}

	function rejected(error){
		console.log(error);
		next(error);
	}
});

module.exports = router;
