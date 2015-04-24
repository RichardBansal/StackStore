var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
	size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL']},
	quantity: { type: Number, required: true }
	
});

var schema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true},
	imageUrl: {type: String, default: 'http://placehold.it/200x200'},
	price: {type: Number, required: true},
	stock: [stockSchema],
	category:[{type: String, required: true}],
	reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});
mongoose.model('Product', schema);