var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	purchaseDate: Date,
	totalCost: String, // this will be a virtual
	status: String,
	products: [{
		quantity: Number,
		product: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Product'
		}
	}],
});

mongoose.model('Order', schema);