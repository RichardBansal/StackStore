app.controller('ShirtController',function($scope, $window, $stateParams, ShirtFactory, AuthService){
	//ToDo: Promise Handling of getShirt
	ShirtFactory.getShirt($stateParams.id).then(fulfilled,rejected);
	
	// var test = {id:"12321",quantity:3,size:"L"};
	// var items = [];
	// items.push(test);

	// $window.localStorage.cart = JSON.stringify(items);
	if(!$window.localStorage.hasOwnProperty("cart")){
		$window.localStorage.cart = JSON.stringify([]);
	}
	//JSON.parse to receive object from local storage
	// 

	$scope.addToCart = function(){
		// console.log($scope.shirt.size);
		// console.log($scope.shirt.quantity);
		// console.log('clicked');
		// var items = {
		// 	item:
		// }

		// var parentProduct = {}
		//$scope.shirt changed to parentProduct

		var currentCart = JSON.parse($window.localStorage.cart);
		currentCart.push($scope.shirt);

		$window.localStorage.cart = JSON.stringify(currentCart);
		console.log($window.localStorage);
	}

	function fulfilled(shirt){ //shirt is actually response
		$scope.shirt = shirt.data.product;
		$scope.size = null;
		$scope.stock = shirt.data.product.stock;
		$scope.reviews = shirt.data.reviews;
		$scope.user = shirt.data.user;
		console.log($scope.stock);


		$scope.edit = false;
		$scope.adminAction = "Update Product";
		// $scope.price


		$scope.toTitleCase = function(str) {
		    return str.replace(/\w\S*/g, function(txt){
		   		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		    });
		};

		$scope.makeEditable = function(){
			//Editing State
			if($scope.edit === true){
				// console.log($scope);
				var shirt = $scope.shirt;
				//ASK: Cannot use $scope when passing params
				ShirtFactory.updateShirt($stateParams.id,shirt).then(fulfilled, rejected)

				function fulfilled(updated){
					if(updated){
						$scope.edit = !$scope.edit
						$scope.adminAction = $scope.edit ? "Save Product":"Update Product";
					} else {
						console.log('not updated!');
					}
				}

				function rejected(error){
					console.log(error);
				}
			} else { //Viewing State
				$scope.edit = !$scope.edit
				$scope.adminAction = $scope.edit ? "Save Product":"Update Product";
			}

		}

        $scope.isLoggedIn = function () {
        	console.log("Hi");
            return AuthService.isAuthenticated();
        };

        $scope.isAdmin = function() {
        	return AuthService.isAdmin();
        };
	}



	function rejected(error){
		console.log(error);
	}
});