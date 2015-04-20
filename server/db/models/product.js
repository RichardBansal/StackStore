var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	description: String,
	imageUrl: String,
	price: Number,
	stock: {type: mongoose.Schema.Types.ObjectId, ref: 'Stock'},
	category:[String],
	reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]

});

mongoose.model('Product', schema);