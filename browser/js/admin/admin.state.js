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
			controller: "AdminController",
			url:'/admin/manage-users',
			templateUrl: 'js/admin/manage-users/manage-users.html'
		})
		.state('admin.manage-orders', {
			controller: "AdminController",
			url:'/admin/manage-orders',
			templateUrl: '/js/admin/manage-orders/manage-orders.html'
		})
		.state('admin.manage-products', {
			controller: "AdminController",
			url:'/admin/manage-products',
			templateUrl: '/js/admin/manage-products/manage-products.html'
		});
});