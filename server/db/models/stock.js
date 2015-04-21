var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	size: String,
	quantity: Number
	

});

mongoose.model('Stock', schema);