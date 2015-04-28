app.controller('AdminController', function($scope, AdminFactory, UserFactory){
	function fulfilled(orders){
		// console.log(orders.data);
		$scope.orders = orders.data;
	}
	function rejected(err){
		console.log(err);
	}
	AdminFactory.getOrders().then(fulfilled, rejected);


	function userFulfilled(users){
		console.log(users.data);
		$scope.users = users.data;
	}
	function userRejected(err){
		console.log(err);
	}
	UserFactory.listUsers().then(userFulfilled, userRejected);


	$scope.toggleAccountType = function(user) {
		//console.log(user);

		if (user.accountType === "user") {
			user.accountType = "admin";
		}
		else if ( user.accountType === "admin") {
			user.accountType = "user";
		}

		//console.log(user);

		UserFactory.updateUser(user._id, user).then(fulfilled, rejected);
	};


	// $scope.viewOrderClicked = false;
	$scope.activeOrderId = false;
	// $scope.showOrder = function(id){
	// 	console.log('showOrder',id);
	// 	return !$scope.activeOrder;
	// }

	$scope.updateStatus = function(){
		// console.log($scope.currentOrder.statusUpdated);
		AdminFactory
			.updateOrder($scope.currentOrder._id,$scope.currentOrder.statusUpdated)
			.then(fulfilled);

		function fulfilled(response){
			console.log('fulfilled');
			if(response.status === 200){
				console.log('status saved');	
			}
		}
	};

	$scope.viewOrder = function(orderId){

		console.log("controller", orderId);
		AdminFactory.getOrders(orderId).then(fulfilled, rejected);
		function fulfilled(order){
			// console.log("individual order", order);
			$scope.currentOrder = order.data[0];
			console.log('currentOrder',$scope.currentOrder);
			// $scope.showOrder($scope.currentOrder._id);
			$scope.activeOrderId = $scope.currentOrder._id;

			// console.log($scope.activeOrder === orderId);
		}
	};
});