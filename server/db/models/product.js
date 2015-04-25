var mongoose = require("mongoose");

require("../../../server/db/models/review");
var Review = require('mongoose').model('Review');

var stockSchema = new mongoose.Schema({
	size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL']},
	quantity: { type: Number, required: true }
	
});

var stockSchema = new mongoose.Schema({
	size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL']},
	quantity: { type: Number, required: true }
	
});

var schema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true},
	imageUrl: {type: String, default: "http://placehold.it/200x200"},
	price: {type: Number, required: true},
	stock: [stockSchema],
	category:[{type: String, required: true}],
	reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
});

schema.methods.findReviews = function findReviews(){
	// console.log('this',this);
	var product = this;

	var reviewFindsPromiseArr = [];

	product.reviews.forEach(function(reviewID){
		reviewFindsPromiseArr.push
			(
				Review.findOne({"_id":reviewID}).exec()
			);
	});
	return reviewFindsPromiseArr;
	//return promise to return all reviews data
};

//find product
	//get reviews
		//get user
// responseObject =
// 					{
// 						product:product,
// 						reviews:[
// 									{
// 										reviews:reviews,
// 										user:user
// 									}
// 								]
// 					};

mongoose.model("Product", schema);
