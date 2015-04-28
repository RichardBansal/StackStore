app.controller("addProductController", function($scope, ShirtFactory){
	$scope.product={
		name: null,
		email:null,
		imageUrl:null,
		price: null,
		stock:[
			{size: 'XS', quantity: null},
			{size: 'S', quantity: null},
			{size: 'M', quantity: null},
			{size: 'L', quantity: null},
			{size: 'XL', quantity: null}
		],
		category: null

	};
	$scope.createProduct=function(){
		console.log($scope.product);
		ShirtFactory.createShirt($scope.product).then(fulfilled, rejected);
			function fulfilled(product){
				console.log(product);

			}
			function rejected(error){
				console.log(error);
			}

	}


});
