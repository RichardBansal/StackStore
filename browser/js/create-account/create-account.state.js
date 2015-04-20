"use strict";

app.config(function ($stateProvider){
	$stateProvider.state('createAccount',{
		url:'/create-account',
		templateUrl: 'js/create-account/create-account.html'
	});
});