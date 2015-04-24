app.config(function ($stateProvider){
	$stateProvider.state('createProduct',{
		controller: "addProductController",
		url:'/admin/product',
		templateUrl: 'js/product/add-product.html'
	});
});