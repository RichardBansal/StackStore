var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	date: {
		type: Number
	}
});

mongoose.model('Order', schema);