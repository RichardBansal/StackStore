app.controller('reviewController',function($scope, reviewFactory){
	console.log('controller loaded');
	// $scope.review = false;
	reviewFactory.getReview($scope.product).then(fulfilled)

	//check if an review alredady exists before creating a form to input
	function fulfilled(review){
		$scope.review = {};
		if(review){
			// console.log(review);
			$scope.review.text = review.data.text
			$scope.review.stars = review.data.stars
			$scope.custom = false;
		} else {
			$scope.review.text = "";
			$scope.review.stars = 0;
			$scope.custom = true;
		}
	}
	
	$scope.saveReview = function(){		
		// console.log('clicked');
		// $scope.review = !$scope.review
		reviewFactory
			.postReview($scope.product,$scope.review.text,$scope.review.stars)
			.then(fulfilled);

		function fulfilled(response){
			// console.log('review created', response);
			// $scope.showForm = false;
			$scope.toggleCustom();
		}
	};

    $scope.toggleCustom = function() {
        $scope.custom = $scope.custom === false ? true: false;
    };
});