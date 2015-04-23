app.controller('ShirtController',function($scope, $stateParams, ShirtFactory){
	console.log('stateParams', $stateParams.id);
	console.log('shirtFactory',ShirtFactory.getShirt.call(ShirtFactory.shirts,$stateParams.id));


	//ToDo: Promise Handling of getShirt
	$scope.shirt = ShirtFactory.getShirt.call(ShirtFactory.shirts,$stateParams.id);
});