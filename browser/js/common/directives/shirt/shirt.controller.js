app.controller('ShirtController',function($scope, $window, $stateParams, ShirtFactory, AuthService){

	ShirtFactory.getShirt($stateParams.id).then(fulfilled,rejected);

	if(!$window.localStorage.hasOwnProperty("cart")){
		$window.localStorage.cart = JSON.stringify([]);
	}
	//JSON.parse to receive object from local storage

	$scope.addToCart = function(){
		var shirtToAdd = ShirtFactory.formatShirt($scope.shirt);
		
		var currentCart = JSON.parse($window.localStorage.cart);
		if(shirtToAdd.size && shirtToAdd.quantity){
			currentCart.push(shirtToAdd);
			$window.localStorage.cart = JSON.stringify(currentCart);
		}

	
	};

	function fulfilled(shirt){ //shirt is actually response
		$scope.shirt = shirt.product;
		$scope.size = null;
		$scope.stock = shirt.product.stock;
		$scope.reviews = shirt.reviews;
		$scope.user = shirt.user;
		// console.log($scope.stock);


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