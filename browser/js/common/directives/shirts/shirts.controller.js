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
	$scope.text="";
	$scope.shirtSearch=function(){
		//console.log($scope.text);
		ShirtFactory.getSearch($scope.text).then(searchfullfilled, searchRejected);
			function searchfulfilled(shirts){
				$scope.shirts = shirts;
			}

			function searchrejected(error){
				console.log(error);
			}
	};	
});