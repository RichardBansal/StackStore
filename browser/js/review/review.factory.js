app.factory('reviewFactory',function($http){
	return {
			postReview: function(productId,text,stars){
				var reviewObj = {
					text:text,
					stars:stars
				};

				var product = {
					id:productId
				};

				return $http.post('api/products/review', {reviewObj,product});

			}
		}
});