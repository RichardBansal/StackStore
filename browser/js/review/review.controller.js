app.controller('reviewController',function($scope, reviewFactory){
	console.log('controller loaded');
	// $scope.review = false;
	$scope.review = {};
	$scope.review.text = "";
	$scope.review.stars = 0;
	
	$scope.saveReview = function(){		
		// console.log('clicked');
		// $scope.review = !$scope.review
		reviewFactory
			.postReview($scope.product,$scope.review.text,$scope.review.stars)
			.then(fulfilled);

		function fulfilled(response){
			console.log('review created', response);
		}
	};
});