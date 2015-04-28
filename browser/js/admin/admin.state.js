"use strict";
app.config(function ($stateProvider){
	$stateProvider
		.state('admin', {
			controller: 'AdminController',
			url:'/admin',
			templateUrl: 'js/admin/admin.html'
		})
		.state('admin.create-product', {
			controller: "addProductController",
			url:'/admin/product',
			templateUrl: 'js/product/add-product.html'
		})
		.state('admin.manage-users', {
			controller: "addProductController",
			url:'/admin/manage-users',
			templateUrl: 'js/admin/manage-users/manage-users.html'
		})
		.state('admin.manage-orders', {
			controller: "addProductController",
			url:'/admin/manage-orders',
			templateUrl: '/js/admin/manage-orders/manage-orders.html'
		});
});