app.controller('ShirtController',function($scope, $stateParams, ShirtFactory, AuthService){
	//ToDo: Promise Handling of getShirt
	ShirtFactory.getShirt($stateParams.id).then(fulfilled,rejected);

	function fulfilled(shirt){ //shirt is actually response
		// console.log('controller',shirt);
		$scope.shirt = shirt.data.product;
		$scope.reviews = shirt.data.reviews;
		$scope.user = shirt.data.user;
		console.log(shirt.data);

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
            return AuthService.isAuthenticated();
        };
	}

	function rejected(error){
		console.log(error);
	}
});