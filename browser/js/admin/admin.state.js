"use strict";
app.config(function ($stateProvider){
	$stateProvider.state('admin',{
		controller: 'AdminController',
		url:'/admin',
		templateUrl: 'js/admin/admin.html'
	});
});