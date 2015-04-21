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

module.exports = router;