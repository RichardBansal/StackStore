app.controller('ShirtController',function($scope, $stateParams, ShirtFactory, AuthService){
	//ToDo: Promise Handling of getShirt
	ShirtFactory.getShirt.call(ShirtFactory.shirts,$stateParams.id).then(fulfilled,rejected)

	function fulfilled(shirt){
		console.log('controller',shirt);
		$scope.shirt = shirt.data.product;
		$scope.reviews = shirt.data.reviews;
		$scope.user = shirt.data.user;

		$scope.edit = false;
		$scope.adminAction = "Update Product";

		$scope.makeEditable = function(){
			$scope.edit = !$scope.edit
			$scope.adminAction = $scope.edit ? "Save Product":"Update Product";
		}

        $scope.isLoggedIn = function () {
            return AuthService.isAuthenticated();
        };
	}

	function rejected(error){
		console.log(error);
	}
});