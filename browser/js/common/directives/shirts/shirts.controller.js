app.controller('ShirtsController', function($scope, ShirtFactory){

	$scope.getShirts = function(category){

		ShirtFactory.getShirts(category).then(fulfilled, rejected);
			function fulfilled(products){
				$scope.shirts = products;
			}

			function rejected(error){
				console.log(error);
			}
		};

		$scope.getShirts();
});