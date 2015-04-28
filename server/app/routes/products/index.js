'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');
var Review = require('mongoose').model('Review');
var User = require('mongoose').model('User');
var q = require("q");

router.get('/',function(req,res,next){
	var modelParams = req.query.category ? {category: req.query.category} : {};
	Product.find(modelParams).exec()
		.then(fulfilled, rejected);

	function fulfilled(products){
		res.json(products).status(200);
	}

	function rejected(error){
		next(error);
	}
});

router.get("/:id/price",function(req,res,next){
	console.log('hitting the right route, id',req.params.id);
	
	Product.findOne({"_id":req.params.id}).exec()
		.then(foundProduct, rejected);

	function foundProduct(product){
		console.log('product found', product.price);
		res.json(product.price);
	}

	function rejected(error){
		console.log(error);
		next(error);
	}
})

router.get("/:id",function(req,res,next){
	Product.findOne({"_id":req.params.id}).exec()
		.then(foundProduct, rejected);

	function foundProduct(product){

		q.all(product.findReviews())
			.then(foundReviews,rejected);
		
		function foundReviews(reviews){
			if(reviews.length === 0) res.json({product:product});
			
			q.all(
					reviews.map(function(review){
						return review.findUser();
					})
				)
				.then(foundUser,rejected);

			function foundUser(user){
				console.log(user);
				res.json({user:user, product:product, reviews:reviews});
			}
		}
	}

	function rejected(error){
		console.log(error);
		next(error);
	}
});

router.put("/edit/:id", function (req,res,next){
	// console.log('edit post made', req.params.id, req.body);
	Product.findByIdAndUpdate(req.params.id,req.body).exec().then(fulfilled, rejected);

	function fulfilled(response){
		console.log(response);
		res.sendStatus(200);
	}

	function rejected(){
		console.log(error);
		next(error);
	}
});

router.post("/review", function(req,res,next){
	console.log(req.user,req.body);

	var review = {
		stars: req.body.reviewObj.stars,
		text: req.body.reviewObj.text,
		user: req.user
	};
	
	Review.create(review).then(fulfilled, rejected);

	function fulfilled(review){
		Product.findOne({'_id':req.body.product.id}, function(err,product){
			product.reviews.push(review);
			product.saveAsync().then(function(response){
				console.log('saved',response);
				res.sendStatus(200);
			});
		});
	}

	function rejected(error){
		console.log(error);
		next(error);
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
