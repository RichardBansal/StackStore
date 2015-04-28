var mongoose = require("mongoose");

require("../../../server/db/models/review");
var Review = require('mongoose').model('Review');
var q = require('q');

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
	reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
	visible: {type: Boolean, default: true}
});

schema.methods.findReviews = function findReviews(){
	var product = this;

	var reviewFindsPromiseArr = [];

	product.reviews.forEach(function(reviewID){
		reviewFindsPromiseArr.push
			(
				Review.findOne({"_id":reviewID}).exec()
			);
	});
	return reviewFindsPromiseArr;
};


schema.methods.saveAsync = function () {
    return q.ninvoke(this,'save');
};

mongoose.model("Product", schema);
