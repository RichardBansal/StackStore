app.controller('reviewController',function($scope, reviewFactory){
	// console.log('controller loaded');
	// $scope.review = false;
	// console.log('test',$scope.product);
	$scope.custom = false;
	
	// console.log('scope',$scope);
	console.log('scope',$scope);
	if($scope.hasOwnProperty('product')){
		if($scope.product.length!==0){
			console.log('in here');
			reviewFactory.getReview($scope.product).then(foundReview)		
		}
	}
	
	//check if an review alredady exists before creating a form to input
	function foundReview(review){
		console.log('review123',review);
		$scope.review = {};
		if(review){
			// console.log(review);
			$scope.review.text = review.data.text
			$scope.review.stars = review.data.stars
			$scope.custom = true;
			// $scope.$apply();
		} else {
			$scope.review.text = "";
			$scope.review.stars = 0;
			$scope.custom = false;
			// $scope.$apply();
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