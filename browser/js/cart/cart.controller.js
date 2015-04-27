app.controller('CartController', function($scope, $window, CartFactory, $q){
	$scope.cart = {};
	var currentCart = JSON.parse($window.localStorage.cart);

	//TODO: Change price based on API Calls
	// $scope.cart.products.price
	//TODO: Line 8 is breaking

	//Retrieving latest prices
	// var updatedProductsPromises = CartFactory.getCurrentPrice(currentCart);
	//.then(latestPrices);

	$q.all(CartFactory.getCurrentPrice(currentCart)).then(latestPrices)

	// updatedProductsPromises.then(latestPrices)`

	function latestPrices(prices){
		console.log("updatedProducts");

		currentCart.forEach(function(product, index){
			product.price = prices[index].data;
		});

		$scope.cart.products = currentCart;
		$scope.total = 0;
		// if($scope.cart.products){
		$scope.total = CartFactory.totalPrice($scope.cart.products);	
		// }	
	}

	// console.log($scope.total/100);
	// $scope.cart.user = {};
	// $scope.user.addressBilling = "";
	// $scope.user.addressShipping = "";

	$scope.completeOrder = function(){
		// console.log($scope.user.addressBilling);
		// console.log("test");
		console.log('cart',$scope.cart);
		CartFactory.completeOrder($scope.cart).then(fulfilled, rejected)


		function fulfilled(response){
			if(response) {
				console.log('order made');
				$window.localStorage.cart = JSON.stringify([]);
			}
			else {
				console.log('failure');
			}
			// if(response){
			// }
		}
		function rejected(error){
			console.log(error);
		//ASK: Error Handling on Client
		}
	};

	$scope.editOrder = function(quantity, index){
			$scope.edit = !$scope.edit;
			console.log(quantity, index);
		
		if($scope.edit === false){
			$scope.cart.products[index].quantity = quantity; //
			$scope.total = CartFactory.totalPrice($scope.cart.products);
			$window.localStorage.cart = JSON.stringify($scope.cart.products);
		}
	};
});