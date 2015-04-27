app.controller('AdminController', function($scope, AdminFactory){
	AdminFactory.getOrders().then(fulfilled, rejected);

	function fulfilled(orders){
		console.log(orders.data);
		$scope.orders = orders.data;
	}
	function rejected(err){
		console.log(err);
	}

});