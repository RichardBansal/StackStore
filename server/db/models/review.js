var mongoose = require('mongoose');

require("../../../server/db/models/user");
var User = require('mongoose').model('User');

function minLength(str) {
	return str.length > 40;
}
var minLengthWithMessage = [minLength, "Input text is too short"];

var schema = new mongoose.Schema({
	stars: 	{ type: Number, required: true, min: 1, max: 5},
	text: 	{ type: String, required: false, validate: minLengthWithMessage },
	user: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
});

schema.methods.findUser = function findUser(){
	var review = this;
	return	User.findOne({"_id":review.user}).exec();
};

mongoose.model('Review', schema);