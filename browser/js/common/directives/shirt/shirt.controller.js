app.controller('ShirtController',function($scope, $stateParams, ShirtFactory){
	//ToDo: Promise Handling of getShirt
	ShirtFactory.getShirt.call(ShirtFactory.shirts,$stateParams.id).then(fulfilled,rejected)

	function fulfilled(shirt){
		console.log('controller',shirt);
		$scope.shirt = shirt.data.product;
		$scope.reviews = shirt.data.reviews;
		$scope.user = shirt.data.user;
	}

	function rejected(error){
		console.log(error);
	}
});