var mongoose = require('mongoose');

function sizeCheck (str) {
	if (str) {
		if ( str.match(/\b(XS|S|M|L|XL)\b/g) ) {
			return true;
		} else {
			return false;
		}
	}
}
var sizeCheckWithMessage = [sizeCheck, "Input text is incorrect"];

var schema = new mongoose.Schema({
	size: { type: String, required: true, validate: sizeCheckWithMessage },
	quantity: { type: Number, required: true }
	
});

mongoose.model('Stock', schema);