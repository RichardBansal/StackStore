var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	purchaseDate: Date,
	totalCost: String,
	status: String,
	user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	products:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]

});

mongoose.model('Product', schema);