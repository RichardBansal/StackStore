app.controller('AdminController', function($scope, AdminFactory){
	AdminFactory.getOrders().then(fulfilled, rejected);

	function fulfilled(orders){
		// console.log(orders.data);
		$scope.orders = orders.data;
	}
	function rejected(err){
		console.log(err);
	}

	$scope.viewOrder = function(orderId){
		// console.log("controller", orderId);
		AdminFactory.getOrders(orderId).then(fulfilled, rejected);
		function fulfilled(order){
			// console.log("individual order", order);
			$scope.currentOrder = order.data[0];
			console.log($scope.currentOrder);
		}
	}
});