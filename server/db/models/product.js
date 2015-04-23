var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	description: {type: String, required: true},
	imageUrl: {type: String, default: 'http://placehold.it/200x200'},
	price: {type: Number, required: true},
	stock: [{type: mongoose.Schema.Types.ObjectId, ref: 'Stock'}],
	category:[{type: String, required: true}],
	reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});
mongoose.model('Product', schema);