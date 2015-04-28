app.controller('AdminController', function($scope, AdminFactory, UserFactory){
	function fulfilled(orders){
		$scope.orders = orders.data;
	}
	function rejected(err){
		console.log(err);
	}
	AdminFactory.getOrders().then(fulfilled, rejected);


	function userFulfilled(users){
		$scope.users = users.data;
	}
	function userRejected(err){
		console.log(err);
	}
	UserFactory.listUsers().then(userFulfilled, userRejected);	


	function productsFulfilled(products){
		// $scope.users = users.data;
		console.log(products);
		$scope.products = products.data;
	}
	function productsRejected(err){
		console.log(err);
	}
	AdminFactory.listProducts().then(productsFulfilled, productsRejected);


	$scope.toggleAccountType = function(user) {

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


	$scope.viewingOrder = false;
	$scope.viewOrder = function(orderId){
		$scope.viewingOrder = !$scope.viewingOrder;
		console.log($scope.viewingOrder);
		
		if ($scope.viewingOrder) {
			AdminFactory.getOrders(orderId).then(fulfilled, rejected);
			function fulfilled(order){
				// console.log("individual order", order);
				$scope.currentOrder = order.data[0];
				console.log('currentOrder',$scope.currentOrder);
				// $scope.showOrder($scope.currentOrder._id);
				$scope.activeOrderId = $scope.currentOrder._id;

				//console.log($scope.activeOrder === orderId);
			}
		}
		else {
			$scope.currentOrder = null;
			$scope.activeOrderId = null;
		}
	};

	$scope.toggleProductVisibility = function(product) {
		// TODO: needs a visibility property on the model
		// TODO: Main shirts page needs to filter based on availabity
		// TODO: Individual shirt URL routes need filters based on shirt availability
		console.log(product.visible);

		//$scope.product.visible = !product.visible;
	};

});