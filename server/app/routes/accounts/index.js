'use strict';
var router = require('express').Router();
var User = require('mongoose').model('User');

router.post('/create', function(req, res, next){
	User.create(req.body).then(fulfilled, rejected);
	function fulfilled(user){
		console.log(user);
	}

	function rejected(error){
		console.log(error);
	}
});

router.get('/details', function(req,res,next){
	console.log(req.session);

	var user_id = req.session.passport.user;
	// console.log(user_id);

	User.findOne({_id:user_id}).exec()
		.then(fulfilled, rejected);
		//TODO: need to look up order based on user_id

	function fulfilled(user){
		// console.log(user);
		//TODO: Only sending back email, do not send back the password salt
		// console.log(user);
		res.send({email:user.email});
		//TODO: Also grab orders based on user id and send this back
	}
	function rejected(err){
		console.log(err);
	}
});

module.exports = router;