app.factory('reviewFactory',function($http){
	return {
			
			getReview: function(productId){
				// var product = {
				// 	id:productId
				// };
				// console.log(productId);
				return $http.get('api/products/'+productId+'/review');
			},
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