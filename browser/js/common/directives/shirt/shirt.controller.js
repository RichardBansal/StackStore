app.controller('ShirtController',function($scope, $stateParams, ShirtFactory){
	// console.log('stateParams', $stateParams.id);
	// console.log('shirtFactory',ShirtFactory.getShirt.call(ShirtFactory.shirts,$stateParams.id));


	//ToDo: Promise Handling of getShirt
	ShirtFactory.getShirt.call(ShirtFactory.shirts,$stateParams.id).then(fulfilled,rejected)

	function fulfilled(shirt){
		// console.log(shirt);
		$scope.shirt = shirt.data;
	}

	function rejected(error){
		console.log(error);
	}
});