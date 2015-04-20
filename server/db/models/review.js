var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	stars: Number,
	text: String,
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	products:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

mongoose.model('Review', schema);