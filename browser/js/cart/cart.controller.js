app.controller('CartController', function($scope, $window, CartFactory, $q){
	$scope.cart = {};
	var currentCart = JSON.parse($window.localStorage.cart);

	$q.all(CartFactory.getCurrentPrice(currentCart)).then(latestPrices);


	function latestPrices(prices){
		// console.log("updatedProducts");

		currentCart.forEach(function(product, index){
			product.price = prices[index].data;
		});

		$scope.cart.products = currentCart;
		$scope.total = 0;
		$scope.total = CartFactory.totalPrice($scope.cart.products);	
	}

	$scope.completeOrder = function(){
		console.log('cart',$scope.cart);
		CartFactory.completeOrder($scope.cart, $scope.total).then(fulfilled, rejected)

		function fulfilled(response){
			if(response) {
				console.log('order made');
				$window.localStorage.cart = JSON.stringify([]);
			}
			else {
				console.log('failure');
			}
		}
		function rejected(error){
			console.log(error);
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

	$scope.removeItem = function(item){
		// console.log(item);
		currentCart.splice(currentCart.indexOf(item), 1);
		$window.localStorage.cart = JSON.stringify(currentCart);
		$scope.total = CartFactory.totalPrice($scope.cart.products);
	};
});