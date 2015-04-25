app.controller('CartController', function($scope, $window){
	$scope.cart = JSON.parse($window.localStorage.cart);
	
});