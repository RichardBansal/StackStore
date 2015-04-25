app.controller('CartController', function($scope, $window){
	$scope.cart = JSON.parse($window.localStorage.cart);
	$scope.total = null;
	$scope.cart.forEach(function(item){
		$scope.total += (item.price/100 * item.quantity);
	});
	// console.log($scope.total/100);
});